import React from "react";
import Navbar from "./Navbar";


function About() {

    return (
        <div>
            <Navbar item1="Dashboard" item2="Guide" item3="Analyze" item4="Predict" />
            <div className="head1">
                What is Electrifix?
            </div>
            <div className="aboutBox">
                <div className="para1">
                    India is the third largest producer of electricity in the world. During the fiscal year (FY) 2021–22, the total electricity generation in the country was 1,719 TWh, of which 1,484 TWh was generated by utilities.
                    <div className="para2">Every year, approximately 15k billion units of power are generated in India.
                        And out of this huge amount, only 41% is generated via renewable sources of energy. <br></br>The rest, 57.4%, is generated via fossil fuels, which include coal as the primary source and lignite, diesel, and gas as other sources.

                    </div> </div>
                <div className="media1">
                    <iframe height="268" width="522" className="about-clip" title="power usage by states" frameborder="0"
                        src="https://www.youtube.com/embed/OyM7MPyIa2g?playlist=OyM7MPyIa2g&loop=1&autoplay=1&controls=0&showinfo=0&mute=1
">
                    </iframe>
                </div>
                <div className="para3">
                    Our platform, WattWise takes in the electricity consumption data of a user and predicts future values of electricity consumption based on an AI-powered energy forecasting algorithm.
                    <br></br><br></br>The appplication works by analyzing the user's historical electricity consumption data, taking into account factors such as time of day, day of the week, and any other relevant factors that could impact electricity consumption. It could then use this data to create a predictive model that would forecast the user's future electricity consumption.
                    <br></br>It also allows the user to input any planned changes to their lifestyle or habits, such as an upcoming vacation or new appliance usage, which could impact their electricity consumption. The app could then adjust its predictions accordingly.
                </div>
                <div className="media2">
                    <img src="https://th.bing.com/th/id/OIP.N7JZJT2HIkC7GwNvPoX3YQHaHa?w=179&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img>
                </div>
                <div className="para4">
                    Additionally, the app could provide users with personalized tips and recommendations for reducing their electricity consumption and lowering their energy bills. This could include suggestions for adjusting their thermostat, using more energy-efficient appliances, and reducing their overall energy usage during peak hours.
                    <br></br><br></br>Overall, an AI-powered energy forecasting app could be a useful tool for users who are looking to better manage their energy consumption and reduce their environmental impact.
                </div>
                <div className="para5">
                    Here's how the app would work:<br></br>
                    1. The user creates an account on our platform.
                    <br></br>2. The user then provides their electricity consumption data, which can be obtained from their electricity bill or smart meter readings, or described by user manually.
                    <br></br>3. The app uses the provided data to create a consumption profile for the user. This includes analyzing the user's consumption patterns, such as when they use the most electricity and how much they typically consume per day.
                    <br></br>4. Using the consumption profile, the app then predicts future electricity consumption for the user. This can be based on historical patterns, seasonality, weather data, and other factors that may affect consumption.
                    <br></br>5. The app presents the user with the predicted consumption values, allowing them to better plan their energy usage and potentially reduce their energy bills.
                    <br></br>6. Over time, as the user continues to provide consumption data, the app's predictions become more accurate and tailored to the user's specific consumption patterns.
                </div>
                <div className="para6">This project is developed for GSC'23.
                    <br></br>We are targetting the following United Nations Sustainable Development Goals:
                    <br></br>11: Sustainable Cities and Communities
                    <br></br>12: Responsible Consumption and Production
                </div>
                <div className="media3">
                    <img src="https://th.bing.com/th/id/OIP.T8g3juudAJJIsBnjUGlFtQHaHa?w=163&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img>
                    <img className="img1" src="https://th.bing.com/th/id/OIP.gU9I_JPszuzqTml2Q__-1AHaHa?w=166&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img>
                    <img src="https://th.bing.com/th/id/OIP.0KArEb-xfmghCTRBlhJvmgAAAA?w=165&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img>
                </div>
            </div>
        </div>
    );
}

export default About;