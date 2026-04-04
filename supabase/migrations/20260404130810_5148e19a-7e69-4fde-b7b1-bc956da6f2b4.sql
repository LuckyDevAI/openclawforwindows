-- Drop the overly broad policy
DROP POLICY IF EXISTS "Authenticated users can view avatars" ON storage.objects;

-- Create a scoped policy: users can only read their own avatar folder
CREATE POLICY "Users can view own avatars"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);