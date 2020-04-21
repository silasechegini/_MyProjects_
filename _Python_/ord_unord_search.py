# using quick sort, we first sort the data set.

def quicksort(data, first, last):
    if last > first:
        split = divconquer(data, first, last)

        #recursively reduce the array size
        quicksort(data, first, split-1)
        quicksort(data, split+1, last)

def divconquer(dataset, first, last):
    anchor = dataset[first]
    indx_1 = first + 1
    indx_2 = last
    stop = False

    while not stop: 
        while (indx_1 <= indx_2) and (dataset[indx_1] <= anchor):
            indx_1 += 1

        while (indx_2 >= indx_1) and (dataset[indx_2] >= anchor):
            indx_2 -= 1

        if indx_1 > indx_2:
            stop = True
        else:
            temp = dataset[indx_2]
            dataset[indx_2] = dataset[indx_1]
            dataset[indx_1] = temp

    temp = dataset[first]
    dataset[first] = dataset[indx_2]
    dataset[indx_2] = temp

    return indx_2

# unordered search algorithm which uses the comparison approach
# this algorithm is only efficient in very small data sets but
# becomes increasingly inefficient with large data sets
def unord_search(dataSet, value):
    for i in range(0, len(dataSet)):
        if dataSet[i] == value:
            return i
    return None


# ordered search algorithm - uses the binary search approach.
# very efficient in really large data sets. 
def ordered_search(dataSet, value, head, tail):
    while tail >= head:
        mid = (head + tail) // 2      

        if dataSet[mid] == value:
            return mid

        if dataSet[mid] > value:
            tail = mid - 1
        else:
            head = mid + 1


    if head > tail:
        return None




def main():
    dataset = [12, 50, 18, 21, 65, 31, 70, 14, 94, 67]
    print("initial dataset : ", dataset)
    quicksort(dataset, 0, len(dataset)-1)
    print("sorted dataset : ", dataset)

# test cases for the ordered search - to find values that 
# exist and those that dont
    items = ordered_search(dataset, 70, 0, len(dataset)-1)
    print("was found at position: ", items)
    items = ordered_search(dataset, 50, 0, len(dataset)-1)
    print("was found at position: ", items)
    items = ordered_search(dataset, 21, 0, len(dataset)-1)
    print("was found at position: ", items)
    items = ordered_search(dataset, 67, 0, len(dataset)-1)
    print("was found at position: ", items)
    items = ordered_search(dataset, 94, 0, len(dataset)-1)
    print("was found at position: ", items)
    items = ordered_search(dataset, 9, 0, len(dataset)-1)
    print("was found at position: ", items)

# test cases for the un-ordered search - to find values that 
# exist and those that dont
    items = unord_search(dataset, 70)
    print("was found at position: ", items)
    items = unord_search(dataset, 50)
    print("was found at position: ", items)
    items = ordered_search(dataset, 9, 0, len(dataset)-1)
    print("was found at position: ", items)

if __name__ == "__main__":
    main()