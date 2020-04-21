# my linked list

class Node(object):
    def __init__ (self, Val):
        self.Val = Val
        self.next = None
    
    def set_node_data(self, val):
        self.Val = val

    def get_node_data(self):
        return self.Val

    def set_node_next(self, next):
        self.next = next

    def get_node_next(self):
        return self.next

# define linked list class

class linked_list(object):
    def __init__ (self, head = None):
        self.head = head
        self.count = 0

    def insert_node(self, data):
        new_node = Node(data)
        new_node.set_node_next(self.head)
        self.head = new_node
        self.count += 1

    def get_node_count(self):
        return self.count

    def dump_linked_list(self):
        temp_node = self.head
        while(temp_node != None):
            print("Node: ", temp_node.get_node_data())
            temp_node = temp_node.get_node_next()


# delete node method 1
    def delete_node(self, index):
        if(index > self.count):
            return
        if((self.head.get_node_next() == None) or (self.head == None)):
            return
        node = self.head
        for temp_count in range(1, index-1):
            node = node.get_node_next()
        node.set_node_next(node.get_node_next().get_node_next())
        self.count -= 1

# delete node method 2
    def delete_node_advance(self, index):
        if(index > self.count):
            return
        if((self.head.get_node_next() == None) or (self.head == None)):
            return
        temp_node = self.head
        for temp_count in range(1, index-1):
            temp_node = temp_node.get_node_next()
        temp_node_next = temp_node.get_node_next()
        if(temp_node.get_node_next().get_node_next() != None):
            temp_node.set_node_next(temp_node_next.get_node_next())
        else:
            temp_node.set_node_next(None)
        self.count -= 1
        temp_node_next.set_node_next(None)

#define the find a node function
    def find_node(self, val):
        counter = 1
        temp = self.head
        while(temp != None):
            if(val == temp.get_node_data()):
                return temp.get_node_data()
            else:
                temp = temp.get_node_next()
            counter += 1
        return None





node_entry = linked_list()
node_entry.insert_node(20)
node_entry.insert_node(30)
node_entry.insert_node(40)
node_entry.insert_node(50)
node_entry.insert_node(60)
node_entry.dump_linked_list()
print("list count: ", node_entry.get_node_count())
node_entry.delete_node(0)
node_entry.dump_linked_list()
print("list count: ", node_entry.get_node_count())

# print("found node: ", node_entry.find_node(0))
# node_entry.delete_node(3)
# node_entry.dump_linked_list()
# print("list count: ", node_entry.get_node_count())
# node_entry.delete_node(3)
# node_entry.dump_linked_list()
# print("list count: ", node_entry.get_node_count())
# node_entry.delete_node(3)
# node_entry.dump_linked_list()
# print("list count: ", node_entry.get_node_count())
# node_entry.delete_node(3)
# node_entry.dump_linked_list()
# print("list count: ", node_entry.get_node_count())
# node_entry.delete_node(2)
# node_entry.dump_linked_list()
# print("list count: ", node_entry.get_node_count())
# node_entry.delete_node(1)
# node_entry.dump_linked_list()
# print("list count: ", node_entry.get_node_count())