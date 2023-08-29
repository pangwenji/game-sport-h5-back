

// 赛事阶段
export const enumsPeriod = {
    1000: "SoccerRealTime", // 足球实时
    1001: "SoccerFullTime", // 足球全场
    1002: "SoccerFistHalf", // 足球上半场
    1003: "SoccerSecondHalf", // 足球下半场
    1004: "SoccerExtraFirstHalf", // 足球加时上半场
    1005: "SoccerExtraSecondHalf", // 足球加时下半场
    1006: "SoccerPenaltyKick", // 足球点球罚球
    1007: "Soccer0to15Min", // 足球0-15min
    1008: "Soccer15to30Min", // 足球15-30min
    1009: "Soccer30to45Min", // 足球30-45min
    1010: "Soccer45to60Min", // 足球45-60min
    1011: "Soccer60to75Min", // 足球60-75min
    1012: "Soccer75to90Min", // 足球75-90min
    1013: "SoccerExtraFullTime", // 足球加时全场
    1014: "SoccerFullTimeInclET", // 足球全场包含加时
    1015: "SoccerPenaltyKickFirst5rounds" // 足球点球大战前5回合
}


// 赛事阶段
export const enumsMatchPeriod = {
    1001: "soccerNotStarted", // 足球比赛未开始
    1002: "soccerFirstHalf", // 足球上半场
    1003: "soccerHalfTime", // 足球中场休息
    1004: "soccerSecondHalf", // 足球下半场
    1005: "soccerFTFinish", // 足球常规时间结束
    1006: "soccerETFirstHalf", // 足球ET(加时赛)上半场
    1007: "soccerETHalfTime", // 足球ET(加时赛)半场时间
    1008: "soccerETSecondHalf", // 足球ET(加时赛)后半场
    1009: "soccerETFinish", // 足球ET(加时赛)结束
    1010: "soccerPenalty", // 足球点球大战
    1011: "soccerFinish", // 足球比赛结束
    1012: "soccerAwaitingET", // 足球等待加时
    1013: "soccerAwaitingPenalty", // 足球等待点球大战
    1014: "soccerPenaltyFinish", // 足球点球大战结束
    1015: "soccerInterrupted", // 足球中断
    1016: "soccerAbandoned" // 足球废弃
}

// 比分类型，如 比分、角球、红黄牌等类型 
export const resultTypeGroup = {
    5: "Score",                   // 得分
    6: "Corner",                  // 角球
    7: "YellowCard",             // 黄牌
    8: "RedCard",                // 红牌
    9: "booking",                 // 得牌(黄牌 + 红牌)
    127: "Kill",                  // 击杀数(电竞)
    5556: "SetScore",            // 盘分(网球、排球、沙滩排球)
    5559: "GameScore",           // 局分(网球、乒乓球、羽毛球)
    5557: "Ace",                  // 发球直接得分(网球)
    5558: "DoubleFaultScore",   // 双误(网球)
    12: "FrameScore",            // 局分(斯诺克)
    13: "BreakScore",            // 一杆得分(斯诺克)
    14: "HomeRun",               // 本垒打(棒球)
    15: "Hit",                    // 安打(棒球)
    16: "Touchdown",              // 达阵(美式足球)
    17: "FieldGoal",             // 射门(美式足球)
    18: "Rank",                   // 排名(赛马、赛狗、赛车等)
    19: "Runs",                   // 得分(板球)
    20: "Fours",                  // 四分(板球)
    21: "Sixes",                  // 六分(板球)
    22: "Wicket",                 // 击落三柱门(板球)
    23: "RunsSingle",               // 得分(板球)
    24: "FoursSingle",             // 四分(板球)
    25: "SixesSingle",             // 六分(板球)
    26: "WicketSingle"             // 击落三柱门(板球)
}

// 玩法类型
export const market_type = {
    1000: "SoccerHandicap", // 足球让球
    1002: "SoccerEuropeanHandicap", //足球欧盘让球
    1005: "Soccer1X2", // 足球独赢（胜平负）
    1006: "SoccerDrawNoBet", // 足球平局退款
    1007: "SoccerOverUnder",
    1008: "SoccerTotalGoalsOddEven",
    1009: "SoccerCorner1x2",
    1010: "SoccerCornerOverUnder",
    1011: "SoccerConnerHandicap",
    1012: "SoccerDoubleChance",
    1015: "SoccerCornerOddEven",
    1016: "SoccerHomeNoBet",
    1017: "SoccerAwayNoBet",
    1018: "SoccerWinningMargin",
    1019: "SoccerLastGoal",
    1021: "SoccerOver/UnderHome",
    1022: "SoccerOver/UnderAway",
    1025: "SoccerCleanSheetHome",
    1026: "SoccerCleanSheetAway",
    1027: "SoccerBothTeamsToScore",
    1028: "SoccerWhichTeamToScore",
    1030: "Soccer1x2&Over/Under",
    1031: "Soccer1x2&XthGoal",
    1032: "Soccer1x2&BothTeamToScore",
    1033: "SoccerHalfTime/FullTime",
    1034: "SoccerBothHalvesOverX",
    1035: "SoccerBothHalvesUnderX",
    1036: "SoccerHomeToScoreInBothHalves",
    1037: "SoccerAwayToScoreInBothHalves",
    1038: "SoccerHomeToWinBothHalves",
    1039: "SoccerHomeToWinEitherHalves",
    1040: "SoccerAwayToWinBothHalves",
    1041: "SoccerAwayToWinEitherHalf",
    1042: "SoccerTheHighestScoringHalf",
    1043: "SoccerTheHighestScoringHalfHome",
    1044: "SoccerTheHighestScoringHalfAway",
    1046: "SoccerToQualify",
    1047: "SoccerHowExactlyWillTheMatchBeDecided",
    1048: "SoccerWillThereBeOvertime",
    1049: "SoccerWillThereBeAGoal",
    1050: "SoccerWillThereBeAPenaltyShootout",
    1051: "SoccerWhenWillThe1stGoalBeScored(15MinInterval)",
    1054: "SoccerCornerRaceToX",
    1055: "SoccerLastCorner",
    1057: "SoccerCornersOver/UnderHome",
    1058: "SoccerCornersOver/UnderAway",
    1060: "SoccerBookingHandicap",
    1061: "SoccerBooking1x2",
    1063: "SoccerBookingsOver/Under",
    1065: "SoccerBookingsOver/UnderHome",
    1066: "SoccerBookingsOver/UnderAway",
    1067: "SoccerYellowCardsHandicap",
    1068: "SoccerYellowCardsOver/Under",
    1069: "SoccerYellowCards1X2",
    1070: "SoccerTotalBookingPoints",
    1072: "SoccerSendingOff",
    1073: "SoccerPlayerSentOffHome",
    1074: "SoccerPlayerSentOffAway",
    1075: "SoccerXthGoalscorer",
    1076: "SoccerAnytimeGoalscorer",
    1077: "SoccerLastGoalscorer",
    1078: "SoccerDoubleChance&Over/Under",
    1079: "SoccerDoubleChance&BothTeamToScore",
    1080: "SoccerMultiScores",
    1082: "SoccerOdd/EvenHome",
    1083: "SoccerOdd/EvenAway",
    1086: "SoccerRedCardsHandicap",
    1087: "SoccerRedCardsOver/Under",
    1088: "SoccerRedCards1X2",
    1089: "SoccerXthGoal",
    1090: "SoccerWhichTeamWinsTheRest",
    1091: "SoccerHomeToWin",
    1092: "SoccerAwayToWin",
    1093: "SoccerAnyTeamToWin",
    1094: "SoccerXthCorner",
    1097: "Soccer1st/2ndHalfBothTeamsToScore",
    1098: "SoccerPenaltyShootoutWinner",
    1099: "SoccerCorrectScore(Max4-4)",
    1100: "SoccerCorrectScore(Max2-2)"

}
