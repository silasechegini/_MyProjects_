#the quick sort algorithm is one of the efficient sorting algorithms after 
#the merge sort. Its efficiency is seen in much larger data sets. 


#defines the main operations of the quick sort algorithm
def quick_sort(dataset, head, tail):
    if head < tail:
        
        # function call to calculate the split point
        pivot_Index = partition(dataset, head, tail)

        # now sort the two partitions
        quick_sort(dataset, head, pivot_Index-1)
        quick_sort(dataset, pivot_Index+1, tail)

#calculate the split point and return the value
def partition(data, head, tail):
    pivot = data[head]
    L_index = head + 1
    U_index = tail
    done = False
    
    # keep moving the upper and lower indicies,
    # swap the uppen and lower index value when lower > pivot 
    # and upper < pivot; do until the split point is found.
    while not done:
        while (L_index <= U_index) and (data[L_index] <= pivot):
            L_index += 1
        while (U_index >= L_index) and (data[U_index]>= pivot):
            U_index -= 1

        if L_index > U_index:
            done = True
        else:
            temp = data[L_index]
            data[L_index] = data[U_index]
            data[U_index] = temp

    #Swap the pivot value and the upper index value 
    # when the split point is found
    temp = data[head]
    data[head] = data[U_index]
    data[U_index] = temp
    
    return U_index



# function call
def main():
    data_set = [12, 50, 18, 21, 65, 31, 70, 14, 94, 67]
    quick_sort(data_set, 0, len(data_set)-1)
    print("sorted data : ", data_set)

if __name__ == "__main__":
    main()