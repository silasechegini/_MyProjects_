#Author - Echegini, Ngozi S.
# This is a double linked list.
# contains a node constructor and a linked list constructor.
# within the linked list are different methods for inserting and removing
# a node from the linked list.

# define Node constructor
class Node(object):
    def __init__ (self, val):
        self.data = val
        self.prv = None
        self.nxt = None

    def set_data(self, val):
        self.data = val

    def get_data(self):
        return self.data

    def set_next(self, next):
        self.nxt = next

    def get_next(self):
        return self.nxt

    def set_prev(self, prev):
        self.prv = prev

    def get_prev(self):
        return self.prv


#define double linke list
class double_linked_list(object):
    def __init__(self, head = None):
        self.first = head
        self.last = None
        self.count = 0

    #this insetrts a node at the beginning of the linked list
    def insert_front(self, data):
        if self.first is None:
            new_node = Node(data)
            self.first = new_node
            self.last = new_node
            self.count += 1
            return
        new_node = Node(data)
        if self.first.nxt is None:
            self.last.prv = new_node
        new_node.set_next(self.first)
        self.first.set_prev(new_node)
        self.first = new_node
        self.count += 1

    #this inserts a node at the end of the linked list
    def insert_end(self, data):
        if self.first is None:
            self.insert_front(data)
            return
        new_node = Node(data)
        new_node.set_prev(self.last)
        self.last.set_next(new_node)
        self.last = new_node
        self.count += 1

# this inserts a node between existing nodes in the linked list
# if the index specified is higher than the current count, the node
# gets inserted at the end of the linked list
    def insert_within(self, data, index):
        if (index > self.count):
            self.insert_end(data)
            return
        if self.first is None:
            new_node = Node(data)
            self.first = new_node
            self.count += 1
            return
        temp_ = self.first
        count = 1
        while (count != index-1):
            temp_ = temp_.get_next()
            count+=1
        new_node = Node(data)
        new_node.set_next(temp_.get_next())
        new_node.set_prev(temp_)
        temp_.nxt.set_prev(new_node)
        temp_.set_next(new_node)
        self.count += 1



#this returns the number of nodes in the linked list
    def get_count(self):
        return self.count

#this prints out the entities in the linked list
    def dump_list(self):
        temp = self.first
        if temp is None:
            print("node: ", self.first)
        while temp is not None:
            print("node: ", temp.get_data())
            temp = temp.get_next()

#this removes a node from the linked list by index
    def remove_by_index(self, index):
        if(self.first == None) or (self.count == 0):
            print("List is empty")
            return
        if(index > self.count):
            return
        temp_count = 1
        temp_node = self.first
        if(index == temp_count):
            self.first = temp_node.get_next()
            self.prv = None
            self.count -= 1
            return
        while(temp_count != index-1):
            temp_node = temp_node.get_next()
            temp_count += 1
        temp_node.set_next(temp_node.get_next().get_next())
        if(temp_node.nxt is not None):
            temp_node.nxt.set_prev(temp_node)
        # print("next: ", temp_node.get_next().get_data())
        # print("prev: ", temp_node.get_prev().get_data())
        # print("prev_next: ", temp_node.nxt.get_prev().get_data())
        self.count -= 1

# this removes a node from the linked list by node ID or value stored
    def remove_by_node(self, node_val):
        if (self.first is None) or (self.count is 0):
            print("List is empty")
            return
        if(self.first.get_data() == node_val):
            self.first = self.first.nxt
            self.first.set_prev(None)
            self.count -= 1
            return
        if(self.last.get_data() == node_val):
            self.last = self.last.prv
            self.last.set_next(None)
            self.count -= 1
            return
        
        temp = self.first
        temp_next = temp.get_next()

        while(temp_next.get_data() != node_val):
            temp = temp.get_next()
            temp_next = temp.get_next()
        temp.set_next(temp_next.get_next())
        temp_next.nxt.set_prev(temp)
        self.count -= 1
        
    #define the find a node function
    def find_node(self, val):
        counter = 1
        temp = self.first
        while(temp != None):
            if(val == temp.get_data()):
                return temp.get_data()
            else:
                temp = temp.get_next()
            counter += 1
        return None

linker = double_linked_list()
linker.insert_end(10)
linker.insert_end(20)
linker.insert_end(30)
linker.insert_end(40)
linker.insert_end(50)
linker.insert_end(60)
linker.insert_end(70)
linker.dump_list()
print("count: ", linker.get_count()) 

if(linker.find_node(80) is not None):
    print("node: ", linker.find_node(80), "was found")
else:
    print(linker.find_node(80), ": not found")
# linker.remove_by_node(70)
# linker.remove_by_node(10)
# linker.remove_by_node(40)
# linker.dump_list()
# print("count: ", linker.get_count()) 

# linker.insert_front(10)
# linker.insert_end(70)
# linker.insert_within(40, 4)
# linker.dump_list()
# print("count: ", linker.get_count()) 

# linker.remove_by_index(1)
# linker.remove_by_index(3)
# linker.remove_by_index(5)
# linker.dump_list()
# print("count: ", linker.get_count()) 



linker.remove_by_index(1)
linker.remove_by_index(1)
linker.remove_by_index(1)
linker.remove_by_index(1)
linker.remove_by_index(1)
linker.remove_by_index(1)
linker.remove_by_index(1)
linker.remove_by_index(1)
linker.dump_list()
print("count: ", linker.get_count())