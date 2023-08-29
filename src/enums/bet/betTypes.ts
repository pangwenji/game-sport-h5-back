
import { BasePagination } from "@/enums/common/basic";

// 单关投注接口  **********************BEGIN**********************
export interface MBetSingleItemRes {
    st: number;
    id: number;
}
export interface BetSinglePassApiRes extends BasePagination {
    records: MBetSingleItemRes[]
}
//  单关投注接口  **********************END**********************

// 串关投注接口  **********************BEGIN**********************
export interface BetMultipleItemRes {
    st: number;
    id: number;
}
export interface BetMultipleApiRes extends BasePagination {
    records: BetMultipleItemRes[]
}
//  串关投注接口  **********************END**********************
