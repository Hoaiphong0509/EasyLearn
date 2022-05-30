import React from 'react'
import s from './styles.module.scss'
const About = () => {
  return (
    <div className={s.root}>
      <div className={s.presentation}>
        <div className={s.overview}>
          <img src="/logo.png" alt="logo" />
          <div className={s.descOverview}>
            <h1>Bạn có biết?</h1>
            <p>
              Ngoài kia có rất nhiều bạn làm sai nghề, tư duy an phận và bị chôn
              chân với một công việc không đủ vui, không đủ sống, các bạn ấy gặp
              hết khủng hoảng tuổi này tới tuổi kia.
            </p>
            <p>
              Tuổi 22 đang ngỡ ngàng không biết mình nên làm nghề gì. Tuổi 28
              thì bàng hoàng không biết lương như mình thì lập gia đình và nuôi
              dạy con cái làm sao. Tuổi 40 nuối tiếc thanh xuân của mình liệu có
              phải đã phí hoài không nhỉ...
            </p>
          </div>
        </div>
        <p>
          Mọi chuyện sẽ rất khác nếu họ được định hướng công việc phù hợp, biết
          cách đặt cho mình một mục tiêu rõ ràng và có đầy đủ kĩ năng cần thiết
          để phát triển sự nghiệp.
        </p>
        <p>
          EasyLearn tin rằng con người Việt Nam không hề thua kém gì so với con
          người ở bất cứ nơi đâu. Con rồng cháu tiên hoàn toàn có thể trở thành
          công dân toàn cầu để sánh vai cùng các cường quốc năm châu.
        </p>
        <p>
          EasyLearn mong muốn trở thành một tổ chức góp phần tạo nên sự thay đổi
          đó, và việc tạo ra cộng đồng học lập trình mới chỉ là điểm bắt đầu.
          Chúng tôi đang nỗ lực tạo ra các khóa học có nội dung chất lượng vượt
          trội, giúp học viên sau khi hoàn thành khóa học có thể trở thành những
          lập trình viên luôn được nhiều công ty săn đón.
        </p>
      </div>
      <div className={s.scope}>
        <div>
          <h1>Tầm nhìn</h1>
          <p>
            Trở thành công ty công nghệ giáo dục có vị thế vững vàng trên thị
            trường, với các sản phẩm hỗ trợ học lập trình chất lượng, thông minh
            và hiệu quả. EasyLearn sẽ nổi tiếng bởi chất lượng sản phẩm vượt
            trội và được cộng đồng tin tưởng chứ không phải vì tiếp thị tốt.
          </p>
        </div>
        <div>
          <h1>GIÁ TRỊ CỐT LÕI</h1>
          <p>
            <strong>Sự tử tế:</strong> Tử tế trong chính người EasyLearn với
            nhau và tử tế với học viên là kim chỉ nam phấn đấu. Đã làm sản phẩm
            là phải chất lượng và chứng minh được hiệu quả, bất kể là sản phẩm
            miễn phí hay giá rẻ. Làm ra phải thấy muốn để người thân mình dùng.
          </p>
          <p>
            <strong>Tư duy số:</strong> Sản phẩm làm ra không phải là để vừa
            lòng đội ngũ trong công ty. Sản phẩm làm ra với mục tiêu cao nhất là
            người học thấy dễ học, được truyền cảm hứng tự học, học tới bài học
            cuối cùng và người học có thể tự tay làm ra những dự án bằng kiến
            thức đã học.
          </p>
          <p>
            <strong>Luôn đổi mới và không ngừng học:</strong> Học từ chính đối
            thủ, học từ những công ty công nghệ giáo dục tốt trên thế giới và
            luôn luôn lắng nghe mọi góp ý từ phía học viên.
          </p>
          <p>
            <strong>Tư duy bền vững:</strong> Có hai thứ đáng để đầu tư giúp
            mang lại thành quả tài chính tốt nhất trong dài hạn của một công ty
            đó là nhân viên và khách hàng.
          </p>
        </div>
      </div>
      <div className={s.gains}>
        <h1 className={s.title}>BẠN NHẬN ĐƯỢC GÌ TỪ EASYLEARN?</h1>
        <div className={s.gainsList}>
          <div>
            <h2>
              <strong>1. Sự thành thạo</strong>
            </h2>
            <p>
              Các bài học đi đôi với thực hành, làm bài kiểm tra ngay trên trang
              web và bạn luôn có sản phẩm thực tế sau mỗi khóa học.
            </p>
          </div>
          <div>
            <h2>
              <strong>2. Tính tự học</strong>
            </h2>
            <p>
              Một con người chỉ thực sự trưởng thành trong sự nghiệp nếu họ biết
              cách tự thu nạp kiến thức mới cho chính mình.
            </p>
          </div>
          <div>
            <h2>
              <strong>3. Tiết kiệm thời gian</strong>
            </h2>
            <p>
              Thay vì chật vật vài năm thì chỉ cần 4-6 tháng để có thể bắt đầu
              công việc đầu tiên với vị trí Intern tại công ty IT.
            </p>
          </div>
          <div>
            <h2>
              <strong>4. Làm điều quan trọng</strong>
            </h2>
            <p>
              Chỉ học và làm những điều quan trọng để đạt được mục tiêu đi làm
              được trong thời gian ngắn nhất.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
