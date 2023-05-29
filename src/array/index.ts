export const ArrayUtil = {
    /**
     * 判断数据是否为空（已判空）
     * @param arr
     */
    arrIsNull: (arr: any[]): boolean => {
        let result: boolean;
        if (arr && arr.length > 0) {
            result = true;
        } else {
            result = false;
        }
        return result;
    },
    /**
     * 交集
     * @param a
     * @param b
     */
    intersect: (a: any[], b: any[]): any[] => {
        return a.filter(v => b.includes(v))
    },
    /**
     * 差集
     * @param a
     * @param b
     */
    except: (a: any[], b: any[]): any[] => {
        return a.concat(b).filter(v => !a.includes(v) || !b.includes(v))
    },
    /**
     * 并集
     * @param a
     * @param b
     */
    union:  (a: any[], b: any[]): any[] => {
        return a.concat(b.filter(v => !a.includes(v)))
    }
}


