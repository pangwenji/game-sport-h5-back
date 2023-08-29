import { QueryFunction } from "@tanstack/react-query";
import { MatchStatisticsApiRes, MatchStatisticsApiReq } from "@/enums/sports/matchTypes";
import { getMatchStatistical } from "@/api/match";

const fetchMatchStatistical: QueryFunction<
    MatchStatisticsApiRes,
    [
        "sportLists",
        MatchStatisticsApiReq
    ]
> = async function ({ queryKey }) {
    const query = queryKey[1];

    const reslut = await getMatchStatistical(query);

    return reslut.data
};

export default fetchMatchStatistical;