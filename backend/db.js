import pkg from "pg";
const { Pool } = pkg;
const pool = new Pool({
    connectionString: "postgresql://postgres.shnjyluotsrpgynuzynj:ShubhranilSupabase@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres",
    max: 200
});
export default pool;