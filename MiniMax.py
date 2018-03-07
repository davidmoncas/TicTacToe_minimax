import numpy as np

#initialize the parameters
P1='X'
P2='O'
table=[0,0,0,0,0,0,0,0,0]


def mover(num,table,player):
	if table[int(num)]==0:
		table[int(num)]=player
	else:
		print("you can't move there")

#Return true if some player won the game
def winner(table,pl):
	if ( (table[0],table[1],table[2])==(pl,pl,pl) or 
		(table[3],table[4],table[5])==(pl,pl,pl) or
		(table[6],table[7],table[8])==(pl,pl,pl) or
		(table[0],table[3],table[6])==(pl,pl,pl) or
		(table[1],table[4],table[7])==(pl,pl,pl) or
		(table[2],table[5],table[8])==(pl,pl,pl) or
		(table[0],table[4],table[8])==(pl,pl,pl) or
		(table[2],table[4],table[6])==(pl,pl,pl) ):
		return True

	else:
		return False

#return a list with possible moves
def available(table):
	return [i for i, j in enumerate(table) if j == 0]

#shows the current game in the console
def showTable(table):
	table=[' ' if i==0 else i for i in table]
	print(str(table[0]) + ' | ' + str(table[1]) + ' | ' + str(table[2]) + '\n' +
		'----------'+ '\n' +
		str(table[3]) + ' | ' + str(table[4]) + ' | ' + str(table[5]) + '\n' +
		'----------'+ '\n' +
		str(table[6]) + ' | ' + str(table[7]) + ' | ' + str(table[8]) + '\n' )


#return the score and best move using minimax algorithm
def miniMax(table,player):
		
	# If is a terminal state, return: 	
	if winner(table,P1):
		return 10,-1
	elif winner(table,P2):
		return -10,-1
	elif len(available(table))==0:
		return 0,-1

	#creating lists for moves and scores, to then choose min/max score
	moves=[]
	scores=[]

	#Iterate in the possible moves
	for i in available(table):

		#make the move to that position
		table[i]=player

		#Recursively, change player and makes moves until reaches
		# a terminal state
		if player==P1:
			val,idx=miniMax(table,P2)

		else:
			val,idx=miniMax(table,P1)
		
		#saving the score of every move
		scores.append(val)
		moves.append(i)
		
		#restarting the game
		table[i]=0
		
	# choosing the best/worst move 
	if player==P1:
		return max(scores) , moves[scores.index(max(scores))]
	else:
		return min(scores) , moves[scores.index(min(scores))]

tablero=[0,0,0,0,0,0,0,0,0]
while (not winner(tablero,P1) or winner(tablero,P2)):

	mover(input('tu turno: '),tablero,P2)
	showTable(tablero)

	mover(miniMax(tablero,P1)[1],tablero,P1)
	showTable(tablero)