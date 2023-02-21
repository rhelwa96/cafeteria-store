import Client from '../database'
import Order from '../types/order.type'

class orderModel {
  async create(o: Order): Promise<Order> {
      try {
        const conn = await Client.connect()   
        const sql = 'INSERT INTO orders (user_id,order_name,price,order_status) values ($1,$2,$3,$4) returning user_id,order_name,price,created_at'
        const result = await conn.query(sql, [o.user_id,o.order_name,o.price,o.order_status])
        conn.release()
       
        return  result.rows[0]

    } catch (error) {
        throw new Error(`Could not add new order ${o.id}. Error: ${error as Error}`)
    }
  }
  async createMultiple (o: Order[]) {
    try {
      const conn = await Client.connect()   
 
      for(var i=0;i<o.length;i++)
      {
      const sql = 'INSERT INTO orders (user_id,order_name,price,order_status) values ($1,$2,$3,$4) returning user_id,order_name,price'
      await conn.query(sql, [o[i].user_id,o[i].order_name,o[i].price,o[i].order_status])
      }
      conn.release()
  
 

  } catch (error) {
      throw new Error(`Could not add new orders. Error: ${error as Error}`)
  }
}

  async RetrieveAll(): Promise<Order[]> {
    try {
    const sql = 'SELECT users.id as users_id, users.full_name, users.email, users.floor_number, users.desk_number,users.department,orders.id,orders.order_name,orders.price,orders.created_at FROM users FULL OUTER JOIN orders ON users.id=orders.user_id WHERE orders.id IS NOT NULL AND orders.completed_at IS NULL ORDER BY orders.created_at::timestamptz DESC'
   

    const conn = await Client.connect()

    const result = await conn.query(sql)

    conn.release()

    return result.rows
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
  }
  async RetrieveAllInactive(): Promise<Order[]> {
    try {
    const sql = 'SELECT users.id as users_id, users.full_name, users.email, users.floor_number, users.desk_number,users.department,orders.id,orders.order_name,orders.price,orders.created_at FROM users FULL OUTER JOIN orders ON users.id=orders.user_id WHERE orders.id IS NOT NULL AND orders.completed_at IS NOT NULL ORDER BY orders.created_at::timestamptz DESC'
   

    const conn = await Client.connect()

    const result = await conn.query(sql)

    conn.release()

    return result.rows
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
  }
  async RetrieveUserHistory(id: string): Promise<Order[]> {
    try {
    const sql =  'SELECT orders.id,orders.order_name,orders.price,orders,orders.created_at,completed_at FROM users FULL OUTER JOIN orders ON users.id=orders.user_id WHERE (users.id=($1) and orders.id IS NOT NULL) ORDER BY orders.created_at::timestamptz DESC'
   
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()


    return result.rows
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }
  
  async RetrieveSingle(id: string): Promise<Order> {
    try {
    const sql = 'SELECT * FROM orders WHERE id=($1)'
   
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()


    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }
  async updateStatus(id: string): Promise<Order> {
    try {
    const sql = `UPDATE orders SET completed_at = NOW() WHERE id=($1) RETURNING *;`

    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async updateSingle(o: Order): Promise<Order> {
    try {
    const sql = `UPDATE orders
                SET user_id=$1,order_name=$2,price=$3
                WHERE id=$6
                RETURNING id,user_id,order_name,price`

    const conn = await Client.connect()

    const result = await conn.query(sql, [o.user_id,o.order_name,o.price,o.id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find order ${o.user_id,o.order_status, o.id}. Error: ${err}`)
    }
  }

  async deleteSingle(id: string): Promise<Order> {
      try {
    const sql = `DELETE FROM orders WHERE id=($1)
                RETURNING id,user_id,order_name,price`
  
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const order = result.rows[0]

    conn.release()

    return order
      } catch (err) {
          throw new Error(`Could not delete order ${id}. Error: ${err}`)
      }
  }


} 

export default orderModel