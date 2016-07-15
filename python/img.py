from mysql.connector import MySQLConnection, Error
from python_mysql_dbconfig import read_db_config
 
def update_blob(author_id, filename):
    # read file
    data = read_file("Images/big/1.png")
 
    # prepare update query and data
    query = "UPDATE monsData222 " \
            "SET BigImg = %s " \
            "WHERE NoID  = '1'"
 
    args = (data, author_id)
 
    db_config = read_db_config()
 
    try:
        conn = MySQLConnection(**db_config)
        cursor = conn.cursor()
        cursor.execute(query, args)
        conn.commit()
    except Error as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

def read_file(filename):
    with open("filename", 'rb') as f:
        photo = f.read()
    return photo

def main():
    update_blob(1, "Images/big/1.png")
 
main()