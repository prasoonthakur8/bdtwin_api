import axios from "axios";

const handleError = (error, message) => {
  console.error(message, error);
  return {
    error: true,
    message,
    details: error.response ? error.response.data : error.message,
    status: error.response ? error.response.status : null
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
    const errorResponse = handleError(error, "Error fetching market selections");
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
  // Extract requestParams from req.body, req.query, or req.params as needed
  const requestParams = req.body; // Assuming the parameters are sent in the request body

  try {
    // Fetch Sports Data
    if (requestParams.fetchSports) {
      const sportsDataResponse = await fetchSportsData(req, res);
      if (sportsDataResponse.error) return; // Response is already sent within fetchSportsData
    }

    // Fetch Series by Sport ID
    if (requestParams.sportId) {
      req.params.sportId = requestParams.sportId; // Setting params for the next function
      const seriesDataResponse = await fetchSeriesBySportId(req, res);
      if (seriesDataResponse.error) return; // Response is already sent within fetchSeriesBySportId
    }

    // Fetch Matches by Series and Sport ID
    if (requestParams.sportId && requestParams.seriesId) {
      req.params.sportId = requestParams.sportId;
      req.params.seriesId = requestParams.seriesId;
      const matchesDataResponse = await fetchMatchesBySeriesAndSportId(req, res);
      if (matchesDataResponse.error) return; // Response is already sent within fetchMatchesBySeriesAndSportId
    }

    // Fetch Markets by Match/Event ID
    if (requestParams.matchId) {
      req.params.matchId = requestParams.matchId;
      const marketsDataResponse = await fetchMarketsByMatchId(req, res);
      if (marketsDataResponse.error) return; // Response is already sent within fetchMarketsByMatchId
    }

    // Fetch Market Selections
    if (requestParams.marketId) {
      req.params.marketId = requestParams.marketId;
      const marketSelectionsDataResponse = await fetchMarketSelections(req, res);
      if (marketSelectionsDataResponse.error) return; // Response is already sent within fetchMarketSelections
    }

    // Fetch Market Odds
    if (requestParams.marketId) {
      req.params.marketId = requestParams.marketId;
      const marketOddsDataResponse = await fetchMarketOdds(req, res);
      if (marketOddsDataResponse.error) return; // Response is already sent within fetchMarketOdds
    }

    // Fetch Session Data by Match ID
    if (requestParams.matchId) {
      req.params.matchId = requestParams.matchId;
      const sessionDataResponse = await fetchSessionDataByMatchId(req, res);
      if (sessionDataResponse.error) return; // Response is already sent within fetchSessionDataByMatchId
    }

    // Fetch Score
    if (requestParams.matchId) {
      req.params.matchId = requestParams.matchId;
      const scoreDataResponse = await fetchScore(req, res);
      if (scoreDataResponse.error) return; // Response is already sent within fetchScore
    }

    // If all fetches are successful, send a combined response
    res.json({ success: true, message: "Data fetched successfully" });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ error: true, message: "Internal server error", details: error.message });
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
  fetchAllData
};
