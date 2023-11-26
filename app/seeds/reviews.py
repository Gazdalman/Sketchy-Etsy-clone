from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text



def seed_reviews():
    seed_review1 = Review(user_id=1, product_id=1,rating=5, review="Ok don't get me wrong I'm glad the delivery was so fast and all but how did it know where I livedd????")
    seed_review2 = Review(user_id=2, product_id=2,rating=5, review="Cheap product but it works. Scary how i just about to order this on the computer in the den and i get up to take the baked beans off the stove and i turn around to go back to the den to checkout my items and theres a stack of packages in my living room")
    seed_review3 = Review(user_id=3, product_id=2,rating=4, review="Granted this was not that expensive but I never once inputed my credit card information but they charged me")
    seed_review4 = Review(user_id=2, product_id=3,rating=5, review="HOW DO YOU KNOW WHERE I LIVEEEEE?!?!!?!?!?")
    seed_review5 = Review(user_id=4, product_id=4,rating=4, review="Faster delivery than sending an email. It just appeared on my doorstep")
    seed_review6 = Review(user_id=2, product_id=1,rating=5, review="But why did you delivery it to my bathtub??? and how did you get in?")
    seed_review7 = Review(user_id=2, product_id=4,rating=5, review="Ordered this for my kids for Christmas and I selected it was a gift and for the from box i said santa and it was all wrapped pretty and all with the to and from sticker but THEY ATE THE COOKIES I HAD JUST MADE!! WHO DO YALL THINK YALL ARE?!?")
    seed_review8 = Review(user_id=4, product_id=2,rating=5, review='I literally just clicked the shopping cart and when the page loaded to input my information it said "DONT WORRY WE KNOW WHERE YOU LIVE" and then i go to close my laptop and all 23 packages are on the tiny coffee table in front of me which mind you I HAVE MY FEET ON!!! HOW???!!!')
    seed_review9 = Review(user_id=5, product_id=3,rating=5, review="At this point im just worried about the safety of my kids and the rest of my family. Packages delivered dan near instantly and INSIDE my house but there was no sign of anyone coming into the house")
    seed_review10 = Review(user_id=4, product_id=3,rating=5, review="So this is my 3rd order now and this was a test run with the new camera i bought. I set them all up around the house and i ordered and the packages mysteriously appeared in my house AGAINNNNN but this time i thought i was prepared. I go to look at the cameras to see hwo they got into the house and I SWEAR it only cuts out for a milisecond and then the presents are there. It doesnt look like its been tampered with and the other cameras never show anything")
    seed_review11 = Review(user_id=2, product_id=5,rating=5, review="This site is mad sketchy but these doggone delivery speeds are unbeatable. They have some questionable methods on how theyre actually delivering the products but if they dont do the dan thing")
    seed_review12 = Review(user_id=3, product_id=1,rating=4, review="Forgot my wedding anniversary an di remembered that these delivery times are phenomenal so i hit a lil skoopdeedoop and guess who never found out i forgot our wedding anniversary")
    seed_review13 = Review(user_id=3, product_id=3,rating=4, review="The craziest part is that they had my address and my credit card information. not sure how they did it but i havent had any OTHER strange charges so i mean Imma just let it go for now ")
    seed_review14 = Review(user_id=4, product_id=1,rating=5, review="I will forever be creeped out with how they get the packages in my house and so quickly but you know if that means i dont have to wait on my packages and nothing serious goes missing imma just chalk it up to the game")
    seed_review15 = Review(user_id=5, product_id=4,rating=2, review="Nah nah i ordered this 18 minutes ago and its just not appearing in my living room. I am not happy. You decided to go and get me accustomed to the lightning fast delivery speeds just to hit me with this tortoise speed. PLEEEEAAAASSSEEEEEE 2 STARSSSS!!!!")

    all_revs = [seed_review1, seed_review2, seed_review3, seed_review4, seed_review5, seed_review6, seed_review7, seed_review8, seed_review9, seed_review10, seed_review11, seed_review12, seed_review13, seed_review14, seed_review15]
    add_revs = [db.session.add(rev) for rev in all_revs]
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

#     db.session.commit()
