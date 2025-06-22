const { createClient } = require("@supabase/supabase-js");
const url = "https://asmfyodebfyccfslyhyi.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbWZ5b2RlYmZ5Y2Nmc2x5aHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1OTM4NDgsImV4cCI6MjA2NjE2OTg0OH0.Zzwe7NLV3bgF2uCpi1u-zDogn_mM9el885JEwgbtm2U"
if (!url || !key) throw new Error("Missing Supabase env vars");
module.exports = createClient(url, key);
