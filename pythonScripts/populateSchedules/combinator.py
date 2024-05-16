class ReturnType:
    def __init__(self, res, arr) -> None:

        self.res = res
        self.arr = arr


def combinate(arr, n, combinations, find):
    r = n
    while r > 0:
        result = findCombination(arr, n, r, find)
        if result:
            # This does not work quite as intended -- see columbia college cs schedule term 6
            if not result.res["courses"]:
                result.res["note"] = f"No articulation agreement for {arr[n - r - 1]}."
            combinations.append(result.res)
            return combinate(result.arr, len(result.arr), combinations, find)

        r -= 1
    # This results in unmatched courses being in a different order from matched courses
    # however the original order of courses should be maintained
    for thing in arr:
        combinations.append({"course": thing,
                             "note": "No matching course found."})
    return combinations


def findCombination(arr, n, r, find):
    data = [0] * r
    return recComb(arr, data, 0, n-1, 0, r, find)


def recComb(arr, data, start, end, index, r, find):

    if index == r:
        fResult = find(data[:r])
        return (ReturnType(fResult, [x for x in arr if x not in data[:r]])
                if fResult else None)

    i = start

    while i <= end and end-i+1 >= r-index:
        data[index] = arr[i]
        result = recComb(arr, data, i + 1, end, index + 1, r, find)
        i += 1
        if result:
            return result


if __name__ == "__main__":
    myArray = [0, 1, 2, 3]

    def findAndPrint(thing):
        # if thing and len(thing)<3:
        #     return thing
        if 0 not in thing and len(thing) < 3:
            return thing

        return None

    print(combinate(myArray, 4, [], findAndPrint))

    def find(strs, agDic, courses):
        return None

    def currFind(alexFind, agDic, courses):
        return lambda arr: alexFind(arr, courses, agDic)
