import React, { useEffect, useState } from 'react';
import { CircularProgress, Pagination } from '@mui/material';
import { Shield, User, MapPin, CreditCard } from 'lucide-react';
import web3 from './web3';
import KYCStorage from './KYCStorage.json';

const contractAddress = '0x0eB08bdBA4A585E39eC3ded019F2C37F1412f213';
const contractABI = KYCStorage.abi;
const contract = new web3.eth.Contract(contractABI, contractAddress);

const ITEMS_PER_PAGE = 10;

const TrustScore = () => {
  const [trustScores, setTrustScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTrustScores = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/kyc/trust-score');
        if (!response.ok) {
          throw new Error(`Failed to fetch trust scores: ${response.statusText}`);
        }
        const data = await response.json();
        setTrustScores(data);
      } catch (error) {
        setError(`API Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchTrustScores();
  }, []);

  const getTrustScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedScores = trustScores.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">KYC Verification and Trust Scores</h1>

      <div className="bg-white rounded-xl shadow-sm border mb-8 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">KYC Submissions</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Number</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trust Score</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedScores.map((kyc, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <User className="inline mr-2 text-gray-400" />
                  {kyc.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <CreditCard className="inline mr-2 text-gray-400" />
                  {kyc.id_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <MapPin className="inline mr-2 text-gray-400" />
                  {kyc.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${kyc.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {kyc.status || 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`font-medium ${getTrustScoreColor(Number(kyc.trust_score))}`}>
                    {kyc.trust_score}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          count={Math.ceil(trustScores.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
          className="mt-4"
          color="primary"
        />
      </div>
    </div>
  );
};

export default TrustScore;
