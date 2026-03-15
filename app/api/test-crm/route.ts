import { NextResponse } from "next/server"
import mysql from "mysql2/promise"

export async function GET() {

  try {

    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT)
    })

    const [rows] = await conn.query("SHOW TABLES")

    return NextResponse.json(rows)

  } catch (error) {

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )

  }

}