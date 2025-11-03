import HiveAPI from "hive-bedrock-api"
import { Timeframe } from "hive-bedrock-data"

const baseURL = "https://api.playhive.com/v0"

const hiveApi = new HiveAPI({
  apiBaseEndpoint: baseURL,
  resolveDynamicTitles: false
})

export const fetchStats = async (gamertag: string) => {
  const { data, error } = await hiveApi.getStatistics(
    gamertag,
    Timeframe.AllTime
  )
  return { data, error }
}

export const searchPlayer = async (gamertag: string) => {
  const { data, error } = await hiveApi.getPlayerSearch(gamertag)
  return { data, error }
}
