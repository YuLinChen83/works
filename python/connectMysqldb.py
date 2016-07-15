import MySQLdb

# Open database connection
db = MySQLdb.connect(host = "localhost", user = "crystal", passwd ="qwer1234", db="project")
# prepare a cursor object using cursor() method
cursor = db.cursor()
# execute SQL query using execute() method.
sql = "SELECT VERSION()"
cursor.execute(sql)
# Fetch a single row using fetchone() method.
data = cursor.fetchone()
print "Database version : %s " % data
# disconnect from server
db.close()