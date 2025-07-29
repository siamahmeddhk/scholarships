import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTopScholarships = async () => {
  const { data } = await axios.get('https://s-server-two.vercel.app/all-scholarships');
  return data;
};

export const useTopScholarships = () => {
  return useQuery({
    queryKey: ['topScholarships'],
    queryFn: fetchTopScholarships,
  });
};
