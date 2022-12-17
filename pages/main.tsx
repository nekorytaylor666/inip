import React from "react";

import {useContract, useNFTs} from "@thirdweb-dev/react";
import {NextPageWithLayout} from "./_app";
import {DREAMS_COME_TRUE_EDITION_ADDRESS} from "src/utils/const";
import {ItemImage} from "@components/item-image/item-image.component";
import Link from "next/link";
import {DefaultLayout} from "@components/layouts/defaultLayout";
import {SkeletonGridComponent} from "@components/skeletons/skeleton-grid.component";

const HomePage: NextPageWithLayout = () => {
    const {contract} = useContract(DREAMS_COME_TRUE_EDITION_ADDRESS);
    const {
        data: items,
        isLoading: isItemsLoading,
        error: itemsError,
    } = useNFTs(contract as any);


    return (
        <div className=" p-4 lg:p-8 ">
            <div className="hero-screen">
                <h1 className="hero-screen__title">
                    Новый способ покупать и помогать
                </h1>
            </div>
            <div className="hero-screen__action">
                <p className="hero-screen__text">
                    Благотворительный маркетплейс, где каждая NFT привязана к
                    товару в реальном мире, которым вы можете поделиться с
                    нуждающимся или оставить себе
                </p>
                <a href="#products" className="button">
                    <span className="button__text">К списку товаров</span>
                    <span className="button__icon">
                        <svg
                            width="35"
                            height="35"
                            viewBox="0 0 35 35"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.0833 23.4103L16.0833 6.16668L18.9166 6.16668L18.9166 23.4103L26.5156 15.8113L28.5188 17.8145L17.5 28.8333L6.48113 17.8145L8.4843 15.8113L16.0833 23.4103Z"
                                fill="#DF5000"
                            />
                        </svg>
                    </span>
                </a>
            </div>
            <div className="how-it-works-screen">
                <h1 className="title title--bad-russian">Как это работает</h1>
                <div className="grid-4" style={{ paddingTop: 40 }}>
                    <div className="card card--without-space">
                        <h3 className="card__pretitle"
                            style={{ paddingBottom: 40 }}
                        >
                            1. Бизнес загружает свои товары в виде NFT
                        </h3>
                        <img className="card__img" src="/images/hats.png" />
                    </div>
                    <div className="card card--without-space">
                        <h3 className="card__pretitle">
                            2. Вы покупаете NFT и дарите его нуждающемуся
                        </h3>
                        <img className="card__img" src="/images/gibhat.png" />
                    </div>
                    <div className="card card--without-space">
                        <h3 className="card__pretitle">
                            3. Нуждающийся получает от вас NFT
                        </h3>
                        <img className="card__img" src="/images/gibhat_2.png" />
                    </div>
                    <div className="card card--without-space">
                        <h3 className="card__pretitle">
                            4. Нуждающийся в любое время меняет NFT на
                            физический товар
                        </h3>
                        <img className="card__img" style={{padding: 20 }} src="images/exchange_hats.png" />
                    </div>
                </div>
            </div>
            <div className="tabs">
                <div className="tab">
                    <input type="checkbox" id="chck1" />
                    <label className="tab-label" htmlFor="chck1">1. Что такое блокчейн?</label>
                    <div className="tab-content">
                        Мы воспользуемся наилучшими технологиями, чтобы дать рынку совершенно новые инженерные
                        решения в разных сферах жизни
                    </div>
                </div>
                <div className="tab">
                    <input type="checkbox" id="chck2" />
                    <label className="tab-label" htmlFor="chck2">2. Что такое USDT?</label>
                    <div className="tab-content">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!
                    </div>
                </div>
                <div className="tab">
                    <input type="checkbox" id="chck3" />
                    <label className="tab-label" htmlFor="chck3">3. Что такое NFT?</label>
                    <div className="tab-content">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!
                    </div>
                </div>
                <div className="tab">
                    <input type="checkbox" id="chck4" />
                    <label className="tab-label" htmlFor="chck4">4. Почему мы используем блокчейн?</label>
                    <div className="tab-content">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!
                    </div>
                </div>
                <div className="tab">
                    <input type="checkbox" id="chck5" />
                    <label className="tab-label" htmlFor="chck5">5. Как мы добиваемся полной прозрачности?</label>
                    <div className="tab-content">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!
                    </div>
                </div>
            </div>
            <div className="domino-horizontal">
                <img src="/images/domino_horizontal.png" alt="" />
                <div
                    className="domino-horizontal__text title title--bad-russian">Даже <br/> небольшое <br/> добро <br/> сподвигает
                    всё
                    <br/> к лучшему
                </div>
            </div>
            {isItemsLoading && <SkeletonGridComponent></SkeletonGridComponent>}
            <div id="products" className="grid grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-3 lg:gap-8">
                {items?.map((item) => (
                    <Link href={"/nft/" + item?.metadata.id}>
                        <div className=" transition-all ease-in-out duration-300 p-3 hover:bg-white hover:text-black ">
                            <ItemImage
                                src={item.metadata.image}
                                alt={"nft-cover"}
                            ></ItemImage>

                            <p className=" font-display text-2xl mt-2 lg:text-5xl lg:mt-4 ">
                                {item.metadata.name}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

HomePage.getLayout = DefaultLayout;

export default HomePage;
