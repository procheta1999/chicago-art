import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Table,Pagination} from 'antd';
import { Image } from 'antd';
import { Modal, Button } from 'antd/lib/radio';

const Index=()=>{
    const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (image,record) => (<>
            <Button type="link" onClick={showModal}>
            {record.id}
          </Button>
          {/* <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
      </Modal> */}
          </>
          ),
      },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
    },
    
    {
        title: 'Artist Name',
        dataIndex: 'artist_title',
        key: 'artist_title',
      },
      {
        title: 'Image',
        dataIndex: 'image_id',
        key: 'image_id',
        render: (image,record) => (
            <Image
            width={200}
            src={`https://www.artic.edu/iiif/2/${record.image_id}/full/843,/0/default.jpg`}
          />
          ),
      },
      {
        title: 'Place of Origin',
        dataIndex: 'place_of_origin',
        key: 'place_of_origin',
      },
      {
        title: 'Starting Year',
        dataIndex: 'date_start',
        key: 'date_start',
      },
      {
        title: 'Ending Year',
        dataIndex: 'date_end',
        key: 'date_end',
      },
      {
        title: 'Medium Used',
        dataIndex: 'medium_display',
        key: 'medium_display',
      },
    //   {
    //     title: 'Publication History',
    //     dataIndex: 'publication_history',
    //     key: 'age',
    //   },
      {
        title: 'Place of Origin',
        dataIndex: 'place_of_origin',
        key: 'place_of_origin',
      },
  ];
    const[data,setData]=useState([]);
    const[page,setPage]=useState(1);
    const[range,setRange]=useState(0);
    const Information= id =>{

    }
    const Next= i =>{
        axios.get("https://api.artic.edu/api/v1/artworks?page="+i)
        .then(res=>{
            console.log("next set of data received",res);
            if(res.data.data.length===0)
            {
                console.log("hello");
            }
            setData(res.data.data);
      
            
        })
        .catch(err=>{
            console.log("error occured");
        })
        
    }
    const onChange=page=>{
console.log("page",page);
setPage(page);
if(page==1)
{
    DataGet();
}
else if(page>1)
{
    Next(page);
   
}
console.log(data);
if(data.length===0)
{
    console.log("hello");
}

    }
const DataGet=()=>{
    axios.get("https://api.artic.edu/api/v1/artworks")
    .then(res=>
        {
            if(res)
            {
                console.log("response received",res);
            }
            setData(res.data.data);
            setRange(res.data.pagination.total);
        }
        )
        .catch(err=>{
            console.log("error");
        })
}
    useEffect(()=>{
        DataGet();
    },[]);
    return(
        <div>
            <Table dataSource={data} 
           
            columns={columns} 
            pagination={false}
            bordered
    title={() => 'The Art Institue of Chicago API Data Visualization'}
    footer={() => ''}/>
    <Pagination
      total={range}
    //   showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      pageSize={12}
      defaultCurrent={page}
      onChange={onChange}
    />
        </div>
    );
}
export default Index;