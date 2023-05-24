export default function () {
  return (
    <div className="relative h-screen text-neutral-950 bg-neutral-200">
      <button
        className="absolute top-0 right-0 z-20 p-5"
        onClick={() => history.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="container mx-auto h-[99%] w-3/5 p-20 shadow-lg overflow-auto custom-scrollbar bg-neutral-100">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora,
        laboriosam aliquam maiores rerum, repudiandae esse ullam eius suscipit
        harum vitae assumenda libero accusamus et, dignissimos voluptatum?
        Ducimus fugit quod ipsa. Accusamus optio, saepe sapiente corrupti sit
        aspernatur voluptatibus odio doloremque minus maiores est exercitationem
        eum odit dignissimos repellendus repellat reiciendis impedit vitae quam,
        ipsum asperiores fugit? Quaerat itaque sequi commodi? Sunt explicabo
        obcaecati temporibus tempora voluptate facilis nam quidem aspernatur
        ipsum necessitatibus. Veritatis amet molestiae quae dignissimos
        cupiditate ut dicta, praesentium architecto ipsum quos temporibus harum
        tempora quibusdam molestias sequi! Inventore, doloremque, eligendi modi
        sunt ex similique rerum facere esse eius illo vero nihil aperiam,
        excepturi sint quam amet itaque autem! Harum, quo laborum numquam
        tempore delectus quaerat itaque iste! Nihil vitae amet harum numquam aut
        veniam doloremque atque laborum? Illum ipsam tenetur, tempore
        consequuntur nesciunt harum qui vel dicta commodi est nam quae. Magnam
        quisquam voluptates dolorem molestiae hic.
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora,
        laboriosam aliquam maiores rerum, repudiandae esse ullam eius suscipit
        harum vitae assumenda libero accusamus et, dignissimos voluptatum?
        Ducimus fugit quod ipsa. Accusamus optio, saepe sapiente corrupti sit
        aspernatur voluptatibus odio doloremque minus maiores est exercitationem
        eum odit dignissimos repellendus repellat reiciendis impedit vitae quam,
        ipsum asperiores fugit? Quaerat itaque sequi commodi? Sunt explicabo
        obcaecati temporibus tempora voluptate facilis nam quidem aspernatur
        ipsum necessitatibus. Veritatis amet molestiae quae dignissimos
        cupiditate ut dicta, praesentium architecto ipsum quos temporibus harum
        tempora quibusdam molestias sequi! Inventore, doloremque, eligendi modi
        sunt ex similique rerum facere esse eius illo vero nihil aperiam,
        excepturi sint quam amet itaque autem! Harum, quo laborum numquam
        tempore delectus quaerat itaque iste! Nihil vitae amet harum numquam aut
        veniam doloremque atque laborum? Illum ipsam tenetur, tempore
        consequuntur nesciunt harum qui vel dicta commodi est nam quae. Magnam
        quisquam voluptates dolorem molestiae hic.
      </div>
    </div>
  );
}
