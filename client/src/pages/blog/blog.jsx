import './scss/blog.css'
import {useFetchNewsQuery}  from '../../store/apis/newsApi'
import { FaLongArrowAltRight } from "react-icons/fa";
import Pagination from '../../components/pagination/pagination'
export default function Blog() {

  const {data, isSuccess} = useFetchNewsQuery()
  return (
    <>
      <div className="Blog">
        <section className="Blog_img_sn">
          <img
            src="https://clickfirstmarketing.com/wp-content/uploads/Purpose-of-Blogging.jpeg"
            alt=""
            className='main_blog_img'
          />
        </section>
        <section className="Blog_card_sn">
        <div className="blog_cards">
          {isSuccess && data?.map(data=>{
            return(
              <div className="bg_card" key={data?.id}>
                <div className="img_cn">
                  <img src={data?.img} alt={data?.id} className="bg_img" />
                </div>
                <div className="bg_details">
                  <h3>{data?.title}</h3>
                    <p>{data?.description}</p>
                <button>Continue Reading <FaLongArrowAltRight className='btn_arrow_icon'/></button>

                </div>

              </div>
            )
          })}
        </div>

        </section>
        <Pagination postsPerPage={3} totalPosts={20} paginate={()=>{
          return 1
        }} />

      </div>
    </>
  );
}
