import React, { useState, useEffect, ReactNode, useCallback } from 'react';
import { Search } from 'lucide-react';
import debounce from 'lodash/debounce';
import axios from 'axios';
import '../../../theme/class.css';
// import { JOINCOUNSELOR } from '../../../apis/userApi';
import { useOrganization } from './OrganizationContext';

const apiUrl = 'https://i11b301.p.ssafy.io/api'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                background: 'white',
                padding: '0px',
                borderRadius: '5px',
                width: '600px',
                height:'500px',
            }}>
                {children}
            </div>
        </div>
    );
};

interface Organization {
    id: number;
    name: string;
    // Add other relevant fields
}

const CounselingOrganizationModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<'search' | 'add' | 'freelance'>('search');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [newOrg, setNewOrg] = useState({ name: '', addr: '', tel: '' });
    const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>([]);
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
    const { setOrganization } = useOrganization();

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const filterOrganizations = (orgs: Organization[], term: string) => {
        const filtered = orgs.filter(org => 
            org.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredOrganizations(filtered);
    };

    const handleOrgClick = (org: Organization) => {
        setSelectedOrg(org);
    };

    const selectOrganization = () => {
        if (selectedOrg) {
            setOrganization(selectedOrg.name, selectedOrg.id);
            closeModal();
        }
    };

    const searchOrganizations = async () => {
        try {
            const response = await axios.get(apiUrl+'/orgs', {
                params: { query: searchTerm }
            });
            setOrganizations(response.data);
            filterOrganizations(response.data, searchTerm);
        } catch (error) {
            console.error('Error searching organizations:', error);
            setOrganizations([]);
            setFilteredOrganizations([]);
        }
    };

    const debouncedSearch = useCallback(
        debounce((term: string) => {
            if (term) {
                searchOrganizations();
            } else {
                filterOrganizations(organizations, term);
            }
        }, 300),
        [organizations]
    );

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTerm = e.target.value;
        setSearchTerm(newTerm);
        filterOrganizations(organizations, newTerm);
    };

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    const addOrganization = async () => {
        try {
            const response = await axios.post(`${apiUrl}/orgs`, newOrg);
            alert('상담기관이 추가되었습니다.');
            setOrganization(response.data.name, response.data.id);
            setNewOrg({ name: '', addr: '', tel: '' });
            setActiveTab('search');
        } catch (error) {
            console.error('Error adding organization:', error);
            alert('상담기관 추가에 실패하였습니다.')
        }
    };

    const selectFreelance = () => {
        setOrganization('프리랜서', 0);
        closeModal();
    };


    return (
        <>
            <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded">
                상담기관 선택
            </button>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="flex mb-4">
                    <button
                        className={`mr-2 px-4 py-2 ${activeTab === 'search' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab('search')}
                    >
                        상담기관 검색
                    </button>
                    <button
                        className={`mr-2 px-4 py-2 ${activeTab === 'add' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab('add')}
                    >
                        상담기관 추가
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'freelance' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab('freelance')}
                    >
                        프리랜서 선택
                    </button>
                </div>

                {activeTab === 'search' && (
                    <div>
                        <div className="flex mb-4">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchTermChange}
                                className="border p-2 flex-grow"
                                placeholder="상담기관 검색..."
                            />
                            <button onClick={searchOrganizations} className="bg-blue-500 text-white p-2 ml-2">
                                <Search size={20} />
                            </button>
                        </div>
                         <div className="h-64 overflow-y-auto">
                            {filteredOrganizations.map((org) => (
                                <div 
                                    key={org.id} 
                                    className={`p-2 border-b cursor-pointer ${selectedOrg?.id === org.id ? 'bg-blue-100' : ''}`}
                                    onClick={() => handleOrgClick(org)}
                                >
                                    {org.name}
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={selectOrganization} 
                            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                            disabled={!selectedOrg}
                        >
                            상담기관 선택하기
                        </button>
                    </div>
                    
                )}

                {activeTab === 'add' && (
                    <div>
                        <input
                            type="text"
                            value={newOrg.name}
                            onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
                            className="border p-2 mb-2 w-full"
                            placeholder="상담기관 이름"
                        />
                        <input
                            type="text"
                            value={newOrg.addr}
                            onChange={(e) => setNewOrg({ ...newOrg, addr: e.target.value })}
                            className="border p-2 mb-2 w-full"
                            placeholder="주소"
                        />
                        <input
                            type="text"
                            value={newOrg.tel}
                            onChange={(e) => setNewOrg({ ...newOrg, tel: e.target.value })}
                            className="border p-2 mb-2 w-full"
                            placeholder="전화번호"
                        />
                        <button onClick={addOrganization} className="bg-green-500 text-white px-4 py-2 rounded">
                            상담기관 추가
                        </button>
                    </div>
                )}

                {activeTab === 'freelance' && (
                    <div>
                    <p>프리랜서로 선택하시겠습니까?</p>
                    <button onClick={selectFreelance} className="bg-yellow-500 text-white px-4 py-2 rounded mt-4">
                        프리랜서 선택
                    </button>
                </div>
                )}
            </Modal>
        </>
    );
};

export default CounselingOrganizationModal;