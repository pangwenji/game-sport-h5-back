import { QueryFunction } from "@tanstack/react-query";
import { getMatchList } from "@/api/match";
import { MatchListApiReq, MatchItemRes } from "@/enums/sports/matchTypes";

const fetchMatchLists: QueryFunction<
    MatchItemRes[],
    [
        "sportLists",
        MatchListApiReq
    ]
> = async function ({ queryKey }) {
    const query = queryKey[1];

    const reslut = await getMatchList(query);

    return reslut.data.records;
};

export default fetchMatchLists;