import axios from "axios";

const fetchSportsData = async () => {
  const apiUrl = "http://142.93.36.1/api/v1/fetch_data?Action=listEventTypes";
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching sports data:", error);
    throw error;
  }
};

const fetchSeriesBySportId = async (sportId) => {
  const apiUrl = `http://142.93.36.1/api/v1/fetch_data?Action=listCompetitions&EventTypeID=${sportId}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching series:", error);
    throw error;
  }
};

const fetchMatchesBySeriesAndSportId = async (sportId, seriesId) => {
  const apiUrl = `http://142.93.36.1/api/v1/fetch_data?Action=listEvents&EventTypeID=${sportId}&CompetitionID=${seriesId}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error;
  }
};

const fetchMarketsByMatchId = async (matchId) => {
  const apiUrl = `http://142.93.36.1/api/v1/fetch_data?Action=listMarketTypes&EventID=${matchId}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching markets:", error);
    throw error;
  }
};

const fetchMarketSelections = async (marketId) => {
  const apiUrl = `http://142.93.36.1/api/v1/fetch_data?Action=listMarketRunner&MarketID=${marketId}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching market selections:", error);
    throw error;
  }
};

const fetchMarketOdds = async (marketId) => {
  const apiUrl = `http://142.93.36.1/api/v1/listMarketBookOdds?market_id=${marketId}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching market odds:", error);
    throw error;
  }
};

const fetchSessionDataByMatchId = async (matchId) => {
  const apiUrl = `http://142.93.36.1/api/v1/listMarketBookSession?match_id=${matchId}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching session data:", error);
    throw error;
  }
};

const fetchScore = async (matchId) => {
  const apiUrl = `http://142.93.36.1/api/v1/score?match_id=${matchId}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching score:", error);
    throw error;
  }
};

const fetchAllData = async (requestParams) => {
  let responseData = {};

  // Fetch Sports Data
  if (requestParams.fetchSports) {
    responseData.sportsData = await fetchSportsData();
  }

  // Fetch Series by Sport ID
  if (requestParams.sportId) {
    responseData.seriesData = await fetchSeriesBySportId(requestParams.sportId);
  }

  // Fetch Matches by Series and Sport ID
  if (requestParams.sportId && requestParams.seriesId) {
    responseData.matchesData = await fetchMatchesBySeriesAndSportId(
      requestParams.sportId,
      requestParams.seriesId
    );
  }

  // Fetch Markets by Match/Event ID
  if (requestParams.matchId) {
    responseData.marketsData = await fetchMarketsByMatchId(
      requestParams.matchId
    );
  }

  // Fetch Market Selections
  if (requestParams.marketId) {
    responseData.marketSelectionsData = await fetchMarketSelections(
      requestParams.marketId
    );
  }

  // Fetch Market Odds
  if (requestParams.marketId) {
    responseData.marketOddsData = await fetchMarketOdds(requestParams.marketId);
  }

  // Fetch Session Data by Match ID
  if (requestParams.matchId) {
    responseData.sessionData = await fetchSessionDataByMatchId(
      requestParams.matchId
    );
  }

  // Fetch Score
  if (requestParams.matchId) {
    responseData.scoreData = await fetchScore(requestParams.matchId);
  }

  return responseData;
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
