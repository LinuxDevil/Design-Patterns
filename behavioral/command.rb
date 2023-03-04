# Command pattern
# ----------------

# The Command pattern is a behavioral design pattern
# in which an object is used to encapsulate all
# information needed to perform an action or trigger
# an event at a later time. This information includes
# the method name, the object that owns the method and
# values for the method parameters.

# It's a behavioral design pattern that turns a request
# into a stand-alone object that contains all information
# about the request. This transformation lets you pass
# requests as a method arguments, delay or queue
# a request’s execution, and support undoable operations.

# Problem:
# --------
# imagine a system that processes
# orders from an e-commerce website. When a new order
# is received, the system needs to perform various tasks,
# such as updating inventory, sending notifications, 
# and charging the customer's payment method. Each of these 
# tasks can be encapsulated in a Command object, which can be 
# executed by an Invoker object in response to a corresponding event.

# Invoker 
class OrderProcessor
  def initialize
    @commands = []
  end

  def add_command(command)
    @commands << command
  end

  def process_order
    @commands.each(&:execute)
  end
end


# Command Interface
class OrderCommand
  def execute
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end

# Concrete Command
class UpdateInventoryCommand < OrderCommand
  def initialize(inventory, order)
    @inventory = inventory
    @order = order
  end

  def execute
    # update inventory based on order details
    @inventory.update_quantity(@order.product_id, @order.quantity)
  end
end

class NotifyCustomerCommand < OrderCommand
  def initialize(notification_service, order)
    @notification_service = notification_service
    @order = order
  end

  def execute
    # send notification to customer based on order details
    @notification_service.send_notification(@order.customer_email, "Your order has been received!")
  end
end

class ChargePaymentCommand < OrderCommand
  def initialize(payment_gateway, order)
    @payment_gateway = payment_gateway
    @order = order
  end

  def execute
    # charge payment method based on order details
    @payment_gateway.charge_customer(@order.customer_id, @order.total_amount)
  end
end

# Receiver
class Inventory
  def update_quantity(product_id, quantity)
    # update inventory for the given product ID
  end
end

class NotificationService
  def send_notification(email, message)
    # send notification to the given email
  end
end

class PaymentGateway
  def charge_customer(customer_id, amount)
    # charge payment method for the given customer ID and amount
  end
end

# Client
require 'kafka'

# initialize Kafka client
kafka = Kafka.new(['localhost:9092'])

# initialize producer to send messages to order topic
producer = kafka.producer

# define order data
order_data = {
  id: 1234,
  items: ['product1', 'product2', 'product3'],
  total: 100.0
}

# create a command object for each task that needs to be executed
update_inventory_command = UpdateInventoryCommand.new(order_data)
send_notification_command = SendNotificationCommand.new(order_data)
charge_payment_command = ChargePaymentCommand.new(order_data)

# create an array of commands to be executed
commands = [update_inventory_command, send_notification_command, charge_payment_command]

# iterate over the commands and execute them
commands.each do |command|
  # create a receiver object for the command
  receiver = Receiver.new

  # create a concrete command with the receiver
  concrete_command = ConcreteCommand.new(receiver, command)

  # create an invoker object with the concrete command
  invoker = Invoker.new(concrete_command)

  # execute the command
  invoker.execute

  # send message to Kafka topic
  producer.produce('order', key: 'new_order', value: "Order #{order_data[:id]} processed")
end

# ensure all messages have been sent before exiting
producer.deliver_messages
