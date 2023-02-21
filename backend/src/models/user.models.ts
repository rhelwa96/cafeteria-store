import bcrypt from 'bcrypt'
import Client from '../database'
import User from '../types/user.type'
import config from '../config'

const DigestPasword = (p:string) =>{
  const s =parseInt(config.salt as string,10)
  return bcrypt.hashSync(`${p}${config.pepper}`,s)

}

class UserModel {
  async create(u: User): Promise<User> {
      try {
        const conn = await Client.connect()   
        const sql = 'INSERT INTO users (user_id,full_name,email,password_digest,user_role,floor_number,desk_number,department) values ($1,$2,$3,$4,$5,$6,$7,$8) returning id,full_name,user_role,floor_number,desk_number,department'
        const result = await conn.query(sql, [ u.user_id,u.full_name,u.email, DigestPasword(u.password_digest),u.user_role ,u.floor_number,u.desk_number,u.department])
        conn.release()      
        return  result.rows[0]

    } catch (error) {
        throw new Error(`Could not add new user ${u.full_name}. Error: ${error as Error}`)
    }
  }

  async RetrieveAll(): Promise<User[]> {
    try {
    const sql = 'SELECT id,user_id,full_name,email,user_role,floor_number,desk_number,department FROM users'

    const conn = await Client.connect()

    const result = await conn.query(sql)

    conn.release()

    return result.rows
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
  }
  
  async RetrieveSingle(id: string): Promise<User> {
    try {
    const sql = 'SELECT user_id,full_name,email,password_digest,user_role,floor_number,desk_number,department FROM users WHERE id=($1)'
   
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async findOne(email: string): Promise<User> {
    try {
    const sql = 'SELECT id,email FROM users WHERE email=($1)'
   
    const conn = await Client.connect()

    const result = await conn.query(sql, [email])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${email}. Error: ${err}`)
    }
  }
  async RetrieveBalance(id: string): Promise<User> {
    try {
      /*
      SELECT COALESCE (SUM(orders.price), 0) FROM users FULL OUTER JOIN orders 
ON users.id=orders.user_id
WHERE (users.id=$1) 
AND
(
  (created_at >= (SELECT date_trunc('day', date_trunc ('month', current_timestamp - interval '1' month)+ interval '22' day)) 
  AND created_at< (SELECT date_trunc('day', date_trunc('month', current_timestamp)+ interval '22' day)))
  AND (SELECT date_part ('day', (SELECT current_timestamp)+ interval '0' day))<22 
)
OR 
(
  created_at >= 
  (SELECT date_trunc ('day', date_trunc ('month', current_timestamp)+ interval '21' day))
  AND (SELECT date_part ('day', (SELECT current_timestamp)+ interval '0' day))>=22 
  
)

      */
     const sql=
     'SELECT COALESCE (SUM(orders.price), 0) FROM users FULL OUTER JOIN orders ON users.id=orders.user_id WHERE (users.id=$1) AND (((created_at >= (SELECT date_trunc(\'day\', date_trunc (\'month\', current_timestamp - interval \'1\' month)+ interval \'22\' day)) AND created_at< (SELECT date_trunc(\'day\', date_trunc(\'month\', current_timestamp)+ interval \'22\' day))) AND (SELECT date_part (\'day\', (SELECT current_timestamp)+ interval \'0\' day))<22 ) OR (created_at >= (SELECT date_trunc (\'day\', date_trunc (\'month\', current_timestamp)+ interval \'21\' day)) AND (SELECT date_part (\'day\', (SELECT current_timestamp)+ interval \'0\' day))>=22  ))';
   // const sql = 'SELECT COALESCE (SUM(orders.price), 0) FROM users FULL OUTER JOIN orders ON users.id=orders.user_id WHERE (users.id=$1) AND ((created_at >= (SELECT date_trunc(\'day\', date_trunc (\'month\', current_timestamp - interval \'1\' month)+ interval \'21\' day)) AND created_at< (SELECT date_trunc(\'day\', date_trunc(\'month\', current_timestamp)+ interval \'21\' day))) AND (SELECT date_part (\'day\', (SELECT current_timestamp)+ interval \'0\' day))<22 )OR (created_at >= (SELECT date_trunc (\'day\', date_trunc (\'month\', current_timestamp)+ interval \'21\' day))AND (SELECT date_part (\'day\', (SELECT current_timestamp)+ interval \'0\' day))>=22 )'
    //const sql = 'SELECT COALESCE (SUM(orders.price), 0) FROM users FULL OUTER JOIN orders ON users.id=orders.user_id WHERE (users.id=$1) AND created_at >= (SELECT date_trunc(\'day\', date_trunc(\'month\', current_timestamp - interval \'1\' month)+ interval \'23\' day)) and created_at< (SELECT date_trunc(\'day\', date_trunc(\'month\', current_timestamp)+ interval \'21\' day));'
  //  console.log(sql)
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }
  
  async RetrieveMutipleBalance(datefrom: string,dateto: string): Promise<User[]> {
    try {
      const sql ='SELECT users.full_name,users.user_id as ID, SUM(price) FROM users FULL OUTER JOIN orders ON users.id=orders.user_id WHERE created_at>=$1 AND created_at<$2 GROUP BY users.id';
      const conn = await Client.connect()
      const result = await conn.query(sql, [datefrom,dateto])
      conn.release()

    return result.rows
    } catch (err) {
        throw new Error(`Date From & Date To Error: ${err}`)
    }
  }


  async updateSingle(u: User): Promise<User> {
    try {
    const sql = `UPDATE users
                SET password_digest=$1
                WHERE id=$2
                RETURNING id,full_name,user_role,floor_number`

    const conn = await Client.connect()

    const result = await conn.query(sql, [
                                          DigestPasword(u.password_digest),                     
                                          u.id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${u.full_name}. Error: ${err}`)
    }
  }

  async deleteSingle(id: string): Promise<User> {
      try {
    const sql = `DELETE FROM users WHERE id=($1)
                RETURNING id,full_name,user_role`
  
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not delete user ${id}. Error: ${err}`)
      }
  }

 async authenticateUser(e:string,password_digest:string): Promise<User | null> {
  try {  
    const sql = `SELECT password_digest FROM users where email=$1`
    const conn = await Client.connect()
    const result = await conn.query(sql, [e]) 
    if(result.rows.length){
      const hash=result.rows[0].password_digest

      const isValid = bcrypt.compareSync(`${password_digest}${config.pepper}`, hash)
      if(isValid){
        const info = await conn.query(
          'SELECT id,full_name,user_role,user_id FROM users where email=($1)',[e]
        )
        conn.release()
        return info.rows[0]
      }
    }
    conn.release()
    return null
    } catch (err) {
        throw new Error(`Could not authenticate! Error: ${err}`)
    }
  
 }


}

export default UserModel