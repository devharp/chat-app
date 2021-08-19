import time

class ChatSession:
    originatorid, sessionid, nodes = None, None, []
    def __init__(self, originatorid=None, sessionid=None) -> None:
        self.originatorid = originatorid
        self.sessionid = sessionid
        self.nodes.append(id)
    
    def getSessionId(self):
        return self.sessionid

    def getOriginatorId(self):
        return self.originatorid

    def addNode(self, id=None):
        if id != None:
            for i in range(len(self.nodes)):
                if id == self.nodes[i]:
                    return
            self.nodes.append(id)
    
    def removeNode(self, id=None):
        if id != None:
            size = len(self.nodes)
            i = 0
            while(i < size):
                if id == self.nodes[i]:
                    del self.nodes[i]
                    size = len(self.nodes)
                i += 1
            
            


c = ChatSession(originatorid=5, sessionid=55)

c.addNode(6)
c.addNode(7)
c.addNode(8)
c.addNode(6)
c.addNode(7)
c.addNode(8)
c.addNode(7)
c.addNode(88)

print(str(c.nodes))

c.removeNode(6)
c.removeNode(6)
c.removeNode(88)

print(str(c.nodes))