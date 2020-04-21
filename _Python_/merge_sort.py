#  The aim of this algorithm is to sort the elements of an array in a more 
# efficient way that is not the bubble sort, rather, the merge sort.
     #has O(n) complexity


data = [12, 50, 18, 21, 65, 31, 70, 14, 94, 67] # the data to be sorterd

#define merge sort
def merge_Sort(dataclass):
    if len(dataclass) > 1:
        mid = len(dataclass) // 2
        left_array = dataclass[:mid]
        right_array = dataclass[mid:]

        # now, recursively reduce the array size to one
        merge_Sort(left_array)
        merge_Sort(right_array)

        # now, begin the merge operation
        i = 0 #index for the left array
        j = 0 #index for the right array
        k = 0 #index for the merged array

        # while each array has content, do this
        while i < len(left_array) and j < len(right_array):
            if left_array[i] < right_array[j]:
                dataclass[k] = left_array[i]
                i += 1
            else:
                dataclass[k] = right_array[j]
                j += 1
            k += 1

        # now, add what ever is left of both arrays to the dataclass
        while i < len(left_array):
            dataclass[k] = left_array[i]
            i += 1
            k += 1
        while j < len(right_array):
            dataclass[k] = right_array[j]
            j += 1
            k += 1

#function call
print(data)
merge_Sort(data)
print(data)