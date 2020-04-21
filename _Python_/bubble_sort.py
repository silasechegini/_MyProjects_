# this implements the bubble sort algorthm which is generally the most basic sort 
# algorithm but not cnsidered to be a practical way of sorting data unless the 
# sorted data is really small.
    #has a O(n^2) complexity - quadractic

def bubble_sort(data):
    for i in range (len(data) - 1, 0, -1):
        sorted = 0
        for j in range(i):
            if data[j] > data[j+1]:
                temp = data[j+1]
                data[j+1] = data[j]
                data[j] = temp
                sorted+=1

        # this will print out the state of the array after each sort 
        # and will end the algorithm once the array is sorted               
        if sorted == 0:      
            return
        else:
            print("current sort state : ", data)

def main():
    data_set = [12, 50, 18, 21, 65, 31, 70, 14, 94, 67]
    bubble_sort(data_set)
    print("sorted data : ", data_set)

if __name__ == "__main__":
    main()