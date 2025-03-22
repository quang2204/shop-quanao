import { useState, useEffect } from "react";
import { getBanners } from "../Apis/Api";

export const useBanners = (page = 1) => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchBanners = async () => {
        setLoading(true);
        const data = await getBanners(page);
        console.log(data);
        setBanners(data.data);
        setLoading(false);
      };
  
      fetchBanners();
    }, [page]);
  
    return { banners, loading };
  };