import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTopScholarships = async () => {
  const { data } = await axios.get('http://localhost:5000/all-scholarships');
  return data;
};

export const useTopScholarships = () => {
  return useQuery({
    queryKey: ['topScholarships'],
    queryFn: fetchTopScholarships,
  });
};
