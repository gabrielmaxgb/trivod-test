import { useEffect, useState } from 'react';
import './App.css';

const API_ROUTE = "https://gist.githubusercontent.com/jeffdrumgod/82ce318339d591768356793fed9dd443/raw/918978b8b743c90a0d48c2f0ccbb226b2848b1ce/vtex-skujson-example.json"

interface IProductDetail {
  size: string,
  color: string,
}

const getUniqueValue = (array: string[]) => {
  const unique = array.filter((value: string, index: number, self: string[]) => {
    return self.indexOf(value) === index;
  });
  return unique;
};

const getProductData = async () => {
  return fetch(API_ROUTE)
    .then(response => response.json())
    .then(data => {
      const sizes: any[] = [];
      const colors: any[] = [];
      const result = data.skus.map((sku: any) => {
        return {
          size: sku.dimensions.Tamanho,
          color: sku.dimensions.COR,
        }
      });

      result.forEach((productDetail: IProductDetail)=> {
        sizes.push(productDetail.size);
        colors.push(productDetail.color);
      });

      const readyData = {
        sizes: getUniqueValue(sizes),
        colors: getUniqueValue(colors),
      };

      return readyData;
    })
    .catch(err => console.log(err));
}; 

function App() {
  const [productData, setProductData] = useState<any>({});
  const [color, setColor] = useState<string>();
  const [size, setSize] = useState<string>();

  useEffect(() => {
    getProductData()
      .then(data => {
        console.log("data")
        console.log(data)
        setProductData(data)
      } );
  }, []);

  return (
    <>
      <p>As cores são</p>
      <form 
        action="" 
        style={{
          padding: "2rem", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center"
        }}
      >
        {
          productData?.colors?.map((size: string, index: number) => {
            return (
                <div onClick={(e) => setSize(size)}>
                  <label htmlFor={size}>{size}</label>
                  <input key={index} id={size} type="radio" name="color-option" value={size} />
                </div>
            ); 
          })
        }
      </form>
      <p>Os tamanhos são</p>
      <form 
        action="" 
        style={{
          padding: "2rem", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center"
        }}
      >
        {
          productData?.sizes?.map((size: string, index: number) => {
            return (
                <div onClick={(e) => setSize(size)}>
                  <label htmlFor={size}>{size}</label>
                  <input key={index} id={size} type="radio" name="size-option" value={size} />
                </div>
            ); 
          })
        }
      </form>
    </>
  );
}

export default App;
