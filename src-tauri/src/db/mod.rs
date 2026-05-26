use sqlx::sqlite::SqlitePoolOptions;
use tauri::{AppHandle, Manager};
use std::path::PathBuf;

pub async fn init_db(app_handle: &AppHandle) -> Result<sqlx::SqlitePool, Box<dyn std::error::Error>> {
    let app_dir = app_handle
        .path()
        .app_data_dir()
        .unwrap_or_else(|_| PathBuf::from("."));

    std::fs::create_dir_all(&app_dir)?;

    let db_path = app_dir.join("agentloft.db");
    let db_url = format!("sqlite:{}?mode=rwc", db_path.display());

    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await?;

    // Enable WAL mode
    sqlx::query("PRAGMA journal_mode=WAL").execute(&pool).await?;
    sqlx::query("PRAGMA foreign_keys=ON").execute(&pool).await?;

    // Run migrations
    let schema = include_str!("schema.sql");
    sqlx::query(schema).execute(&pool).await?;

    Ok(pool)
}