class ReturnType:
    def __init__(self, res, arr) -> None:

        self.res = res
        self.arr = arr


# CSC 123, CSC 101, COMM 101 -> CISP 300, CISP 360, COMM 301
# COMM 101, CSC 123, CSC 101 -> CISP 5000, COMM 301
# COMM 101, CSC 123, CSC 101, ART 102 -> CISP 5000, COMM 301, No articulation for ART 102

def combinate(arr, n, combinations, find):
    
    # arr = COMM 101, CSC 123, CSC 101, ART 102

    r = n
    while r > 0:
        result = findCombination(arr, n, r, find)
        if result:

            if not result["courses"]:
                replaced = list(set(arr) - set(result.arr))
                combinations.append(replaced)
            else:
                combinations.append(result.res)
            return combinate(result.arr, len(result.arr), combinations, find)
        
        r-=1

    # arr = ART 102
    for thing in arr:
        combinations.append("DNE")
    return combinations

def findCombination(arr, n ,r, find):

    data = [0] * r
    return recComb(arr, data, 0, n-1, 0, r, find)

def recComb(arr, data, start, end, index, r, find):

    if index == r:
        fResult =  find(data[:r])
        return ReturnType(fResult, [x for x in arr if x not in data[:r]]) if fResult else None
    
    i=start
    while i<= end and end-i+1 >= r-index:
        data[index] = arr[i]
        result = recComb(arr,data,i+1,end,index + 1, r, find)
        i+=1
        if result:
            return result


'''myArray = [0,1,2,3]

def findAndPrint(thing):

    #if thing and len(thing)<3:
        #return thing
    if 0 not in thing and len(thing)<3:
        return thing
    
    return None

print(combinate(myArray,4, [], findAndPrint))


def find(strs, agDic, courses):

    return None

def currFind(alexFind, agDic, courses):
    
    return lambda arr : alexFind(arr,courses,agDic)'''