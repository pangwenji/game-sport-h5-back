
import { BasePagination } from "@/enums/common/basic";
// 获取赛事类表信息接口  **********************BEGIN**********************
// 请求参数类型
enum LanguageType {
    ENG = "ENG", // 英文
    CMN = "CMN", // 中文
    VI = "VI", // 越南语
}

enum GetMatchListOrderByEnum {
    BY_START_TIME = 0,
    BY_LEAGUE = 1,
}

interface TeamItem {
    na: string;
    id: number;
    lurl: string;
    host: boolean;
}

interface ItemPeriod {
    pe: number
    tyg: number
    sc: [
        number,
        number
    ]
}

export interface MatchItemRes {
    bt: number;
    tms: number;
    lg: TeamItem;
    ts: TeamItem[];
    id: number;
    sid: number;
    mc: {
        pe: number
        r: boolean
        s: number
        tp: Number
    }
    nsg: ItemPeriod[]
    mg: mgItem[]
}

interface mgItem {
    mty: number
    nm: string
    pe: number
    mks: mksItem[]
}

interface mksItem {
    au: number
    id: number
    li: string
    mbl: number
    op: {
        na: string
        nm: string
        ty: number
        od: number
        li: string
    }[]
}

export interface MatchListApiReq {
    marketTypes?: number[]; // 盘口类型集合，个数必须在0和2之间
    sportId?: number; // 运动ID
    sportIds?: number[]; // 运动id集合
    leagueId?: number; // 联赛ID，matchIds、leagueId、type三者必传其一
    type?: number; // 赛事分组类型，例如：1、滚球，3、今日，传数字类型编号，matchIds、leagueId、type三者必传其一，其他情况type必传
    leagueIds?: number[]; // 联赛id集合，可批量获取多个联赛的赛事及赔率信息
    beginTime?: number; // 查询开始时间戳，13位时间戳，与查询结束时间戳一起组成闭区间，仅当查询早盘或串关时支持此参数，按日查询时用西四区时区划分时间段
    endTime?: number; // 查询结束时间戳，参考beginTime
    languageType?: keyof typeof LanguageType; // 国际化语言类型: ENG，CMN等，传ENG、CMN字符串，接口会根据语言类型返回对应语言的赛事、玩法、选项名，不能为空
    matchIds?: number[]; // 赛事Id集合，批量查询赛事ID对应的赛事列表和赔率，matchIds、leagueId、type三者必传其一
    current?: number; // 当前页码，从1开始计数
    size?: number; // 每页大小, 默认50，一页最多50，最小不能小于-2
    orderBy?: GetMatchListOrderByEnum; // 赛事列表排序方式：0 按开赛时间排序，1 按联赛排序， 传：0或1
    isPC?: boolean; // 是否为PC页面请求，App接入不传该参数，PC页面传true
}

export interface MatchListApiRes extends BasePagination {
    records: MatchItemRes[]
}
// 获取赛事类表信息接口  **********************END**********************


// 获取赛事统计信息接口  **********************BEGIN**********************

// 定义赛事类型
enum MatchPlayType {
    滚球 = 1,
    今日 = 2,
    早盘 = 3,
}

// 定义运动类型
enum Sports {
    足球 = 1,
    篮球 = 2,
}

// 定义热门联赛下的赛事个数统计接口
interface HotLeagueStats {
    id: number; // ID
    mt: number; // 赛事总数
    na: string; // 联赛名称
    lt: number; // 正在滚球的个数
    lurl: string; // logo的url地址
    sid: Sports; // 运动种类ID
}

// 定义每个类型下每个运动里的赛事统计信息接口
interface SportStats {
    sid: Sports; // 运动ID
    c: number; // 统计赛事个数
}

// 定义每个类型下的赛事接口
interface MatchType {
    ty: MatchPlayType; // 分类类型，如 滚球、今日、早盘等，返回对应枚举code
    des: string; // 分类描述
    tc: number; // 赛事总数
    ssl: SportStats[]; // 每个类型下每个运动里的赛事统计信息
}

export interface MatchStatisticsApiReq {
    languageType: keyof typeof LanguageType
}

export interface MatchStatisticsApiRes {
    tc?: number; // 赛事个数
    sl?: MatchType[]; // 所有赛事对应的不同类型的场次集合
    ht?: number; // 热门总数，包括竞彩赛事和热门联赛赛事
    hls?: HotLeagueStats[]; // 热门联赛下的赛事个数统计
}
//  获取赛事统计信息接口  **********************END**********************


export interface SportFileTypeApiReq {
    languageType: keyof typeof LanguageType
}

export interface SportFileTypeApiRes {
    'MarketType': {
        [key: string]: {
            [key: string]: string
        }
    }
    'Match Period': {
        [key: string]: {
            [key: string]: string
        }
    }
    'Match Status': {
        [key: string]: {
            [key: string]: string
        }
    }
    'Option': {
        [key: string]: {
            [key: string]: string
        }
    }
    'Period': {
        [key: string]: {
            [key: string]: string
        }
    }
    'Sports': {
        [key: string]: {
            [key: string]: string
        }
    }
    'Tournament Phase': {
        [key: string]: {
            [key: string]: string
        }
    }
}