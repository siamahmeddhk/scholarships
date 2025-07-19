import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchScholarships = async (searchTerm = '') => {
  const { data } = await axios.get(`http://localhost:5000/scholarships?search=${searchTerm}`);
  return data;
};

export const useScholarships = (searchTerm) => {
  return useQuery({
    queryKey: ['scholarships', searchTerm],
    queryFn: () => fetchScholarships(searchTerm),
    keepPreviousData: true,
  });
};
