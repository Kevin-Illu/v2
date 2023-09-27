import sqlite3 from 'sqlite3'
import MainDatabase from '@main/services/database/database'

// Tipo de datos para representar una instancia de base de datos SQLite.
export type SQLiteDatabaseInstance = sqlite3.Database

// Tipo de datos para representar una instancia de la base de datos principal de la aplicación.
export type MainDatabaseInstance = MainDatabase

// Tipo de datos para representar una consulta SQL en forma de cadena.
export type SQLQuery = string
