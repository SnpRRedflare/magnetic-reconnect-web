
import pandas as pd
import math

# Create a DataFrame
df = pd.read_csv("n5pxvbsg.m0r.csv", sep="\s+", header=None, names=["Year", "Day", "Hour", "Minute", "IMF_M", "BY", "BZ", "Vx", "Vy", "Vz", "P_density", "P_Temp", "Plasma_B"])

# Specify the date you want to filter for
year_to_find = 2019
day_to_find = 3
hour_to_find = 0
minute_to_find = 0

while hour_to_find < 24:
  # Filter the DataFrame based on the specified date
  filtered_data = df[
      (df['Year'] == year_to_find) &
      (df['Day'] == day_to_find) &
      (df['Hour'] == hour_to_find) &
      (df['Minute'] == minute_to_find)
  ]
  
  # Check if there are any matching rows
  if not filtered_data.empty:

      minute_to_find = 0
      # Access the values you need from the filtered DataFrame
      values = filtered_data.iloc[0, 4:13].tolist()
      IMF_M = values[0]
      By = values[1]
      Bz = values[2]
      Vx = values[3]
      Vy = values[4]
      Vz = values[5]
      P_density = values[6]
      P_Temp = values[7]
      Plasma_B = values[8]
  
      ##################################################layer 1
  
      #####solar wind speed
      solar_wind_speed = math.sqrt((Vx**2) + (Vy**2) + (Vz**2))
  
      #####clock angle
  
      def calculate_clock_angle(By, Bz):
          # Using atan2 to get the correct quadrant
          angle_rad = math.atan2(By, Bz)
  
          # Convert from radians to degrees
          angle_deg = math.degrees(angle_rad)
  
          # Ensure the angle is within 0° to 360°
          if angle_deg < 0:
              angle_deg += 360
  
          return angle_deg
  
      # Sample input
      CA = calculate_clock_angle(By, Bz)
  
      #####Southward Component of the IMF
  
      s_imf = Bz################loop 24 times
  
      ##################################################  tip of pyramid of death
      file_path = "n5pxvbsg.m0r.csv"
  
      def magnetic_reconnection_likelihood(sws, imfs, pb, pd, pt, ca, scimf, weights, max_values):
          # Check if any value exceeds the max values
          if any(v > max_val for v, max_val in zip([sws, imfs, pb, pd, pt, ca, scimf], max_values)): 
              return "No data"
  
          factors = [sws, imfs, pb, pd, pt, ca, scimf]
  
          # Calculate the weighted sum
          p = sum(w * f for w, f in zip(weights, factors))
  
          # Normalize the result to a value between 0 and 1
          p_normalized = round(100*(p / sum(w * f_max for w, f_max in zip(weights, max_values))), 4)
  
          return p_normalized
  
      # Example usage:
      weights = [0.3, 0.25, 0.20, 0.1, 0.07, 0.05, 0.03]
      max_values = [15000, 9000, 900, 900, 9000000, 180, 9000]
  
      likelihood = magnetic_reconnection_likelihood(solar_wind_speed, IMF_M, Plasma_B, P_density, P_Temp, CA, s_imf, weights, max_values)
      if likelihood == "No data" and  minute_to_find < 60:
        minute_to_find += 5
        continue
      print(f"Magnetic Reconnection Likelihood: {likelihood}")
      hour_to_find += 1
      continue
  else:
      print("No data found for the specified date.")

      hour_to_find += 1
      continue

