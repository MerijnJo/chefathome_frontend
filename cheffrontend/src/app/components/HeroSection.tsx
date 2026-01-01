import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-b from-lapis to-battleship text-nyanza
                        py-16 md:py-18 lg:py-20 px-6 md:px-10">
            <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-10 lg:gap-12 items-center">
                {/* Left: Title + copy */}
                <div className="flex flex-col gap-5">
                    <h1 className="font-bold leading-tight text-4xl md:text-5xl lg:text-[3.25rem]">
                        Chef Aan Huis
                    </h1>

                    <p className="text-nyanza/90 text-base md:text-lg leading-relaxed max-w-prose">
                        Ervaar de luxe van een privéchef zonder je deur uit te gaan, want met
                        <strong> Chef Aan Huis</strong> geniet je van een volledig verzorgd diner.
                    </p>

                    {/* Link to chefs page */}
                    <Link
                        href="/chefs"
                        className="w-fit bg-nyanza text-lapis font-semibold px-5 py-2.5
                                   rounded-[var(--radius)] shadow hover:bg-ash transition"
                    >
                        Ontdek meer
                    </Link>
                </div>

                {/*/!* Right: Sign-in card *!/*/}
                {/*<div className="flex justify-center">*/}
                {/*    <div className="bg-nyanza text-lapis rounded-[var(--radius)] shadow-xl*/}
                {/*          p-4 md:p-5 w-full max-w-sm ring-1 ring-ash/30">*/}
                {/*        <h2 className="text-lg md:text-xl font-semibold mb-3 text-center">Sign In</h2>*/}
                {/*        <form className="flex flex-col gap-2.5">*/}
                {/*            <input*/}
                {/*                type="email"*/}
                {/*                placeholder="Email"*/}
                {/*                className="border border-battleship/50 text-battleship placeholder-ash/80*/}
                {/*           rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lapis/40"*/}
                {/*            />*/}
                {/*            <input*/}
                {/*                type="password"*/}
                {/*                placeholder="Password"*/}
                {/*                className="border border-battleship/50 text-battleship placeholder-ash/80*/}
                {/*           rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lapis/40"*/}
                {/*            />*/}
                {/*            <button*/}
                {/*                type="submit"*/}
                {/*                className="bg-lapis text-nyanza rounded-md py-2 hover:bg-battleship transition"*/}
                {/*            >*/}
                {/*                Sign In*/}
                {/*            </button>*/}
                {/*            <a href="#" className="text-xs md:text-sm text-lapis hover:underline text-center">*/}
                {/*                Forgot password?*/}
                {/*            </a>*/}
                {/*        </form>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </section>
    );
}
