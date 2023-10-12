import axios from "axios";

const getLiveSData = async (req, res) => {
  try {
    // API Endpoint
    const apiUrl = "https://api.sportplus.live/v3.1/matches/view";

    // Query parameters
    const params = {
      id: "4832919",
      sport_id: "cricket",
      tournament_id: "2529465",
      lang: "es",
    };

    // Headers from provided JSON
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      Origin: "https://es12.sportplus.live",
      Referer: "https://es12.sportplus.live/",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
      "Sec-Ch-Ua":
        '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"Windows"',
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
    };

    // Fetch data from API
    const response = await axios.get(apiUrl, {
      params,
      headers,
      esponseType: "arraybuffer",
    });
    const data = response.data;

    console.log(data);

    // Send data to frontend
    res.json(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).send("Internal Server Error");
  }
};

// Initialize an in-memory cache
let cache = {
  data: null,
  expiry: null,
};

const CACHE_TIME = 30000000; // cache for 30 seconds

const getAllSportsData = async (req, res) => {
  try {
    const { game_name } = req.query;

    if (!game_name) {
      return res.status(400).json({ error: "game_name is required" });
    }

    const apiUrl = `${process.env.ALL_SPORTS_URL}/${game_name}/?met=Livescore&APIkey=${process.env.ALL_SPORTS_API}`;

    // Check if we have non-expired data in cache
    if (cache.data && cache.expiry > Date.now()) {
      return res.json(cache.data);
    }

    const response = await axios.get(apiUrl);

    // Update cache
    cache = {
      data: response.data,
      expiry: Date.now() + CACHE_TIME,
    };

    return res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getData = async (req, res) => {
  try {
    const { game_id } = req.query;

    if (!game_id) {
      return res.status(400).json({ error: "game_id is required" });
    }

    const urlInplay = `${process.env.BETSAPI_URL}/v1/betfair/sb/inplay?sport_id=${game_id}&token=${process.env.BETSAPI_KEY}`;
    const urlUpcoming = `${process.env.BETSAPI_URL}/v1/betfair/sb/upcoming?sport_id=${game_id}&token=${process.env.BETSAPI_KEY}`;

    // Making concurrent API calls
    const [responseInplay, responseUpcoming] = await Promise.all([
      axios.get(urlInplay),
      axios.get(urlUpcoming),
    ]);

    // Basic response validation
    if (
      !responseInplay.data ||
      !responseUpcoming.data ||
      responseInplay.data.success !== 1 ||
      responseUpcoming.data.success !== 1
    ) {
      return res.status(500).json({ error: "Invalid API response" });
    }

    const data = {
      inplay: responseInplay.data,
      upcoming: responseUpcoming.data,
    };

    return res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const cricketData = async (req, res) => {
  try {
    const apiUrl =
      "https://www.pinb888.com/sports-service/sv/compact/events?_g=1&btg=2&c=&cl=3&d=&ev=&g=&hle=false&inl=false&l=3&lg=&lv=&me=0&mk=1&more=false&o=1&ot=1&pa=0&pimo=0%2C1&pn=-1&sp=8&tm=0&v=0&wm=&locale=en_US&_=1696418196743";

    const response = await axios.get(apiUrl);
    const rawData = response.data;

    // Extracting data and formatting it according to requirements
    const formattedData = formatData(rawData);

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const formatData = (data) => {
  // Extracting and formatting cricket matches data
  const matches = data.n[0][2].map((matchData) => {
    const [tournamentId, tournamentName, matchesInfo] = matchData;

    // Extracting individual matches
    const individualMatches = matchesInfo.map((individualMatchData) => {
      const [
        matchId,
        team1,
        team2,
        ,
        matchTime,
        ,
        ,
        ,
        oddsInfo,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        matchType,
      ] = individualMatchData;

      // Extracting odds
      const odds =
        oddsInfo && oddsInfo["0"] && oddsInfo["0"][0] ? oddsInfo["0"][0] : [];

      return {
        matchId,
        team1,
        team2,
        matchTime: new Date(matchTime), // Convert timestamp to date
        matchType,
        odds: {
          homePrice: odds[0],
          awayPrice: odds[1],
          // other relevant odds info...
        },
        // ... other fields as needed
      };
    });

    return {
      tournamentId,
      tournamentName,
      matches: individualMatches,
      // ... other fields as needed
    };
  });

  return {
    matches,
    // ... other fields if needed
  };
};

export { getData, cricketData, getAllSportsData, getLiveSData };
