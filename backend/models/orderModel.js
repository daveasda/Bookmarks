import pool from "../config/db.js";

export const createGuestOrder = async (order) => {
    const client = await pool.connect();

    try{
        await client.query("BEGIN");

        const orderResult = await client.query(
            `INSERT INTO customer_order 
                (account_id, guest_email, recipient_name, delivery_phone, delivery_address, delivery_method, subtotal, delivery_fee, total, payment_method, status)
                VALUES (NULL, $1,$2, $3, $4, $5, $6, $7, $8, 'cod', 'placed')
                RETURNING order_id, placed_at`,
                [order.email, order.recipientName, order.phone, order.address, order.deliveryMethod, order.subtotal, order.deliveryFee, order.total]
        );

        const savedOrder = orderResult.rows[0];

        //Insert each purchased book
        for (const item of order.items) {
            await client.query(
            `INSERT INTO order_item 
            (order_id, book_id, book_title,unit_price, quantity)
            VALUES ($1, $2, $3, $4, $5)`,
            [savedOrder.order_id, item.id,item.title, item.price,item.quantity,]);
        }
        
        // Save everything together.
        await client.query("COMMIT");

        return savedOrder;
    } catch (error) {
            // Undo all inserts if any query fails.
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
}