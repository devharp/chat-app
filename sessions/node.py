class Node:
    temp_id, node_id = None, None
    
    def __init__(self, temp_id=None, node_id=None):
        self.temp_id = temp_id
        self.node_id = node_id

    def setNodeId(self, node_id):
        self.node_id = node_id

    def setTempId(self, temp_id):
        self.temp_id = temp_id

    def getNodeId(self):
        return self.node_id

    def getTempId(self):
        return self.temp_id
