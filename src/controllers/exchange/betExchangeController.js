import axios from "axios";

const handleError = (error, message) => {
  console.error(message, error);
  return {
    error: true,
    message,
    details: error.response ? error.response.data : error.message,
    status: error.response ? error.response.status : null,
  };
};

const fetchSportsData = async (req, res) => {
  const apiUrl = "http://142.93.36.1/api/v1/fetch_data?Action=listEventTypes";
  try {
    const response = await axios.get(apiUrl);
    return res.json(response.data);
  } catch (error) {
    const errorResponse = handleError(error, "Error fetching sports data");
    return res.status(errorResponse.status || 500).json(errorResponse);
  }
};

const fetchSeriesBySportId = async (req, res) => {
  const sportId = req.params.sportId;
  const apiUrl = `http://142.93.36.1/api/v1/fetch_data?Action=listCompetitions&EventTypeID=${sportId}`;
  try {
    const response = await axios.get(apiUrl);
    return res.json(response.data);
  } catch (error) {
    const errorResponse = handleError(error, "Error fetching series");
    return res.status(errorResponse.status || 500).json(errorResponse);
  }
};

const fetchMatchesBySeriesAndSportId = async (req, res) => {
  const { sportId, seriesId } = req.params;
  const apiUrl = `http://142.93.36.1/api/v1/fetch_data?Action=listEvents&EventTypeID=${sportId}&CompetitionID=${seriesId}`;
  try {
    const response = await axios.get(apiUrl);
    return res.json(response.data);
  } catch (error) {
    const errorResponse = handleError(error, "Error fetching matches");
    return res.status(errorResponse.status || 500).json(errorResponse);
  }
};

const fetchMarketsByMatchId = async (req, res) => {
  const matchId = req.params.matchId;
  const apiUrl = `http://142.93.36.1/api/v1/fetch_data?Action=listMarketTypes&EventID=${matchId}`;
  try {
    const response = await axios.get(apiUrl);
    return res.json(response.data);
  } catch (error) {
    const errorResponse = handleError(error, "Error fetching markets");
    return res.status(errorResponse.status || 500).json(errorResponse);
  }
};

const fetchMarketSelections = async (req, res) => {
  const marketId = req.params.marketId;
  const apiUrl = `http://142.93.36.1/api/v1/fetch_data?Action=listMarketRunner&MarketID=${marketId}`;
  try {
    const response = await axios.get(apiUrl);
    return res.json(response.data);
  } catch (error) {
    const errorResponse = handleError(
      error,
      "Error fetching market selections"
    );
    return res.status(errorResponse.status || 500).json(errorResponse);
  }
};

const fetchMarketOdds = async (req, res) => {
  const marketId = req.params.marketId;
  const apiUrl = `http://142.93.36.1/api/v1/listMarketBookOdds?market_id=${marketId}`;
  try {
    const response = await axios.get(apiUrl);
    return res.json(response.data);
  } catch (error) {
    const errorResponse = handleError(error, "Error fetching market odds");
    return res.status(errorResponse.status || 500).json(errorResponse);
  }
};

const fetchSessionDataByMatchId = async (req, res) => {
  const matchId = req.params.matchId;
  const apiUrl = `http://142.93.36.1/api/v1/listMarketBookSession?match_id=${matchId}`;
  try {
    const response = await axios.get(apiUrl);
    return res.json(response.data);
  } catch (error) {
    const errorResponse = handleError(error, "Error fetching session data");
    return res.status(errorResponse.status || 500).json(errorResponse);
  }
};

const fetchScore = async (req, res) => {
  const matchId = req.params.matchId;
  const apiUrl = `http://142.93.36.1/api/v1/score?match_id=${matchId}`;
  try {
    const response = await axios.get(apiUrl);
    return res.json(response.data);
  } catch (error) {
    const errorResponse = handleError(error, "Error fetching score");
    return res.status(errorResponse.status || 500).json(errorResponse);
  }
};

const fetchAllData = async (req, res) => {
  try {
    // Fetch Sports Data
    const sportsResponse = await fetchSportsData();
    const sportsData = sportsResponse.data;

    // Assuming the first sport for demonstration
    const firstSportId = sportsData[0].eventType;

    // Fetch Series Data
    const seriesResponse = await fetchSeriesBySportId({
      params: { sportId: firstSportId },
    });
    const seriesData = seriesResponse.data;

    // Assuming the first series for demonstration
    const firstSeriesId = seriesData[0].competition.id;

    // Fetch Matches Data
    const matchesResponse = await fetchMatchesBySeriesAndSportId({
      params: { sportId: firstSportId, seriesId: firstSeriesId },
    });
    const matchesData = matchesResponse.data;

    // Assuming the first match for demonstration
    const firstMatchId = matchesData[0].event.id;

    // Fetch Markets Data
    const marketsResponse = await fetchMarketsByMatchId({
      params: { matchId: firstMatchId },
    });
    const marketsData = marketsResponse.data;

    // Assuming the first market for demonstration
    const firstMarketId = marketsData[0].marketId;

    // Fetch Market Selections
    const marketSelectionsResponse = await fetchMarketSelections({
      params: { marketId: firstMarketId },
    });
    const marketSelectionsData = marketSelectionsResponse.data;

    // Fetch Market Odds
    const marketOddsResponse = await fetchMarketOdds({
      params: { marketId: firstMarketId },
    });
    const marketOddsData = marketOddsResponse.data;

    // Fetch Session Data
    const sessionDataResponse = await fetchSessionDataByMatchId({
      params: { matchId: firstMatchId },
    });
    const sessionData = sessionDataResponse.data;

    // Fetch Score
    const scoreResponse = await fetchScore({
      params: { matchId: firstMatchId },
    });
    const scoreData = scoreResponse.data;

    // Aggregate all data
    const allData = {
      sportsData,
      seriesData,
      matchesData,
      marketsData,
      marketSelectionsData,
      marketOddsData,
      sessionData,
      scoreData,
    };

    return res.json(allData);
  } catch (error) {
    const errorResponse = handleError(error, "Error fetching all data");
    return res.status(errorResponse?.status || 500).json(error);
  }
};

export {
  fetchSportsData,
  fetchSeriesBySportId,
  fetchMatchesBySeriesAndSportId,
  fetchMarketsByMatchId,
  fetchMarketSelections,
  fetchMarketOdds,
  fetchSessionDataByMatchId,
  fetchScore,
  fetchAllData,
};
