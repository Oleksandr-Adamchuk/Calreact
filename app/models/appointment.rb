class Appointment < ApplicationRecord
  validates :title, :app_time, presence: true
  validates :title, length: { minimum: 3 }
  validate :app_time_cannot_be_in_the_past

  private

  def app_time_cannot_be_in_the_past
    if app_time.present? && app_time < Time.now
      errors.add(:app_time, "can't be in the past")
    end
  end
end
