-- Create cases table
CREATE TABLE IF NOT EXISTS public.cases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    case_id TEXT NOT NULL UNIQUE,
    client_phone TEXT NOT NULL,
    client_name TEXT NOT NULL,
    type TEXT NOT NULL,
    status TEXT NOT NULL,
    next_session_date TEXT,
    last_update TEXT,
    lawyer TEXT DEFAULT 'أ. سمر سمير',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public reads (since clients will search by case_id and phone)
CREATE POLICY "Allow public read access to cases" 
ON public.cases
FOR SELECT 
TO public
USING (true);

-- Create policy to allow public inserts (for demo admin panel, or you can restrict this to authenticated users later)
CREATE POLICY "Allow public insert to cases" 
ON public.cases
FOR INSERT 
TO public
WITH CHECK (true);

-- Create policy to allow public updates
CREATE POLICY "Allow public update to cases" 
ON public.cases
FOR UPDATE
TO public
USING (true);
