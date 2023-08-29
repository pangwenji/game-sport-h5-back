export const getCurrentSc = (data, period, tyg = null) => {
	let scoreItem = null
	if(tyg) {
		scoreItem = data?.find((item) => item.pe === period && item.tyg === tyg);
	}else{
		scoreItem = data?.find((item) => item.pe === period);
	}
    return scoreItem ? scoreItem.sc : null;
};

export const getMks = (data, mty) => {
	let result = data.find((item) => item.mty === mty);
	let empty = { op: mty === 1005 ? [null, null, null] : [null, null] };
	if (!result) {
		return empty;
	}
	return result.mks.length > 0 ? result.mks[0] : empty;
};