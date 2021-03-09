# HOW TO AMPLIFY YOUR DEVELOPMENT PROCESS WITH AWS AMPLIFY

## What is AWS Amplify?

"AWS Amplify is an end-to-end solution that enables mobile and front-end web developers to build and deploy secure, scalable full stack applications, powered by AWS. With Amplify, you can configure app backends in minutes, connect them to your app in just a few lines of code, and deploy static web apps in three steps. Get to market faster with AWS Amplify." This is an quote from official Amplify website and while it sounds promising (like all new solutions) I wasn't expecting that I would "Get to market faster with AWS Amplify". I was wrong.
AWS Amplify is an neat little toolbox which helps you with using AWS services in mobile or frontend. If you need to add fast reliable storage, or authentication, or pub/sub. You can use Amplify.
Whole frameworks is composed of three components: libraries, UI components and CLI toolchain. You use libraries to for example add the authentication using Cognito. UI components are neat little components for all major players like vue.js, react, angular, ionic, react native, native mobile development (flutter coming [soon](https://aws.amazon.com/blogs/mobile/announcing-aws-amplify-flutter-developer-preview/)). So if you need the authentication, AWS will provide basic vue.js form for you...how cool is this. Libraries and UI components are open source. Finally CLI toolchain is the component I was least hyped for. I was expecting some basic solution which will require to do a lot of my own. This toolchain will hold your hand every step of the way and I mean it. Adding the authentication it will ask you if you have for example an IAM user. If you say "NO" it will open the browser on AWS website for you and wait while you add new user. This component was there all the way with info, tips and thus I was spending less time reading about how to do it in the docs and more time just doing it.

## Why not do it yourself (if you can)?

You are probably reading this and thinking "I can do all it myself why would I need the AWS tool for it". Well lucky You but there are few things to consider:

1. You are in minority. Most frontend developers I know don't know how to do backend.
2. I also can add authentication or database support to my own backend but I will be doing it for at least few hours (authentication showed later has taken me 20 minutes only and a lot of this time was unattended).
3. Even if I do it myself I am not always sure whether I've done it the right, secure way. If I'm making my own website it is ok, but when you are delivering the solution for a client, you need to be 100% sure that you are not exposing sensitive data for someone skillful to just get it.
4. There are right now a lot of regulations in place concerning sensitive data storage. You can do it yourself, but it will take time and effort and using AWS you will have it in no time.

## How Amplify compares to Firebase? Which should I use?

After reading a little I think that if you are a small team and you do not work with a lot of data you can skip AWS. Firebase has lower learning curve and there is a lot more step by step tutorials about it. On the other hand if you have some experience with AWS, Amplify is the better choice because you will know what to expect and where to look for savings.

## Adding authentication in vuejs application (demonstration)

I can talk all day about why it is good or bad solution but nothing speaks better than a little demonstration. I will try to add the basic email authentication to bare bones vue.js application.

Prerequisites:

- node.js installed (if you need to install it refer to this [page](https://nodejs.org/en/download/)),
- AWS account created (if you don't yet have one, create it [here](https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fportal.aws.amazon.com%2Fbilling%2Fsignup%2Fresume&client_id=signup#/start)),

1. Ok so for start we have to install and configure the AWS Amplify. Run this in your terminal:

   `npm install -g @aws-amplify/cli`

2. Then when the installation finishes type:

   `amplify configure`

3. You will be asked series of questions like your preferred region (choose something closest to you), Amplify user name. Then AWS will prompt you to log in and create IAM user. You can leave all default values there, but one thing that is important is to add the user "AdministratorAccess". Otherwise it will not work as expected (AWS Amplify needs this permissions to provision services like Cognito, S3 etc.). When creating the user, save the accessKeyId and secretAccessKey, you will need them in a minute.

SCREENSHOT

4. Type the accessKeyId and secretAccessKey, when prompted.

5. If everything is ok you will get the success message inside your terminal.

6. Now we can proceed to the fun part of adding the authentication. Create new vue.js app using vue CLI:

   `vue create hello-world`

7. Go to the root of our project and type this in terminal to add the authentication service:

   `amplify add auth`

8. Then push the service with:

   `amplify push`

9. Now install the node libraries:

   `npm install aws-amplify @aws-amplify/ui-vue`

10. Go to file main.js. You should find it in the src directory and add this code beneath last import:

    ```
        import Amplify from "aws-amplify";
        import awsconfig from "./aws-exports";
        import "@aws-amplify/ui-vue";
        Amplify.configure(awsconfig);
    ```

11. Open App.js file and replace whole template part with this:

    ```
    <template>
        <amplify-authenticator>
            <div>
                <HelloWorld msg="Welcome to Your Vue.js App" />
                <amplify-sign-out></amplify-sign-out>
            </div>
        </amplify-authenticator>
    </template>
    ```

    This is the Amplify vue.js UI component that will render the login/register form and our content (content displayed after login is located within amplify-authenticator so we will display div with HelloWorld component and log out component).

12. Go to HelloWorld.js and replace whole template with:

    ```
    <template>
        <div class="hello">
            <h1>{{ msg }}</h1>
            <img src="../assets/200.gif" alt="" />
        </div>
    </template>
    ```

13. I've added some img because this site was a little empty. And voila you now should have working authentication on your website. If you don't have account you can obviously register. All users can be managed from the IAM Management Console.

SCREENSHOT

## How much will it cost?

It is important to address the elephant in the room and talk about money. Cloud solutions can be pricy. In all fairness right now I'm still using the free tier in AWS but looking at AWS site about IAM we can read that: "IAM is a feature of your AWS account offered at no additional charge. You will be charged only for use of other AWS services by your users.". So in my case when adding authentication I was using mainly Cognito which is priced accordingly:

SCREENSHOT

MAU is monthly active users (so users that logged in at least once per month) and in my application when testing etc. I acquired 2 users so 2 x $0.0055 = $0.011, which is just ridiculous. And I would pay this only when I get more than 50000 users monthly. For this price I can test the app for months and pay nothing. This cost is low but we have to remember that my "app" was using one small part of AWS only, but I think that if we look up the prices before using services and keep monitoring what is happening in our account we can use Amplify for testing purposes and some small private tools for almost free. For business solutions...it depends, because if we have a lot of users this can get pretty pricy really fast. So here we would need someone who knows ins and outs of AWS and will recommend solutions based on their price and our current requirements.

## Conclusion

Overall Amplify was big surprise for me. I was having a nice time implementing authentication. All was streamlined, tools were easy to use and were playing great with my stack. Documentation was ok and up to date. Libraries can be used in many ways for example you don't have to use the Amplify UI, which will help in some borderline cases. Price is not an issue when doing some small projects. For big ones I would recommend to speak with someone with a lot of experience in AWS who would be able to recommend solutions based on their price and advantages. The great thing about solutions like AWS is that we don't have to use it all. We can utilize AWS authentication and rest do by our own thus eat cookie and have a cookie. If You have some spare time I would highly recommend to give Amplify a try.

My resources:

- https://docs.amplify.aws/lib/auth/getting-started/q/platform/js
- https://docs.amplify.aws/cli/start/install#option-1-watch-the-video-guide
- https://aws.amazon.com/amplify/
- https://github.com/aws-amplify/amplify-js
- https://blog.back4app.com/aws-amplify-vs-google-firebase/
- https://aws.amazon.com/blogs/mobile/announcing-aws-amplify-flutter-developer-preview/
- https://aws.amazon.com/cognito/pricing/
- https://aws.amazon.com/iam/

Other resources:

- https://www.youtube.com/watch?v=SnqABG8e9Zk this is recording from summit in 2019 where David Maccarone has managed to build real time voting app in under 25 minutes. Using AWS Amplify obviously,
- https://www.youtube.com/watch?v=ucmbO2lWC2A this is short video of "Fireship" youtube channel about how Amplify compares to Firebase, might come in handy if you used Google and want to give AWS a try,
