import React from 'react'
import { ListRoomArea } from '../../component/ListRoomArea'
import { SearchArea } from '../../component/SearchArea'
import { Slider } from '../../component/Slider'
import { Reason } from '../../component/Reason'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { layDuLieuPhong } from '../../../../redux/action/phongAction'

export const HomeUser = () => {

  // Danh sách banner
  const listBanner = [
    {
      title: 'Sống đậm chất riêng',
      image: 'https://ik.imagekit.io/tvlk/image/imageResource/2023/01/04/1672832128279-058ecb9c711fcf1d732685bfaba3eefa.jpeg?tr=h-230,q-75,w-472',
    },
    {
      title: 'Coupon 20%',
      image: 'https://ik.imagekit.io/tvlk/image/imageResource/2023/01/05/1672895303799-b606809bc4a9a275e517bddc86ae252c.png?tr=h-230,q-75,w-472',
    },
    {
      title: 'Mường Thanh',
      image: 'https://ik.imagekit.io/tvlk/image/imageResource/2023/02/16/1676541934785-e298a8078752c09865da53cc0ea80c6c.png?tr=h-230,q-75,w-472',
    },
    {
      title: 'Du lịch sành điệu mở thẻ Shinhan',
      image: 'https://ik.imagekit.io/tvlk/image/imageResource/2023/02/15/1676424638964-1cfdbadd8fafb9833687d671a29f2668.jpeg?tr=h-230,q-75,w-472',
    },
    {
      title: 'Không thể lỡ mùa anh đào rực rỡ 50%',
      image: 'https://ik.imagekit.io/tvlk/image/imageResource/2023/02/24/1677241355474-7600499dd8000f1cdd4ae1ad3b779a9a.jpeg?tr=h-230,q-75,w-472',
    },
  ]

  const dispatch = useDispatch();

  // const {layDuLieuPhong} = bindActionCreators(phongCreator, dispatch);
  
  useEffect(()=> {
    dispatch(layDuLieuPhong());
  }, [])


  return (
    <div className=''>
      <div className='w-full' style={{backgroundImage: 'linear-gradient(-180deg, #7ac3f1,#0770cd)'}}>
        <Slider
          data={listBanner}
        />
      </div>
      <SearchArea/>
      <ListRoomArea/>
      <Reason/>
    </div>
  )
}
